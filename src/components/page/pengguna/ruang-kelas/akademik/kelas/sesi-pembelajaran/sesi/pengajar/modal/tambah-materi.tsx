import { tambahAktifitasMateriSesiAction } from '@/actions/pengguna/ruang-kelas/aktifitas/sesi/tambah-materi'
import {
  CardSeparator,
  ControlledInput,
  ControlledMateri,
  ControlledPustakaMedia,
  ControlledQuillEditor,
  ControlledSwitch,
  Form,
  FormError,
  MateriItemType,
  Modal,
  ModalFooterButtons,
  PustakaMediaFileType,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const isShareFs = z.object({
  share: z.literal(true),
  materi: z.any().superRefine(objectRequired),
})

const isNotShareFs = z.object({
  share: z.literal(false),
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
  berkas: z.array(z.any()),
})

const formSchema = z.union([isShareFs, isNotShareFs])

export type TambahMateriSesiFormSchema = {
  share: boolean
  materi?: MateriItemType
  judul?: string
  catatan?: string
  berkas?: PustakaMediaFileType[]
}

const initialValues: TambahMateriSesiFormSchema = {
  share: true,
  berkas: [],
}

type TambahMateriSesiModalProps = {
  idSesi: string | undefined
  show?: boolean
  onHide: () => void
}

export default function TambahMateriSesiModal({
  idSesi,
  show = false,
  onHide,
}: TambahMateriSesiModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const onSubmit: SubmitHandler<TambahMateriSesiFormSchema> = async (data) => {
    if (!idSesi) return

    await handleActionWithToast(
      tambahAktifitasMateriSesiAction(idKelas, idSesi, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              'pengguna.ruang-kelas.sesi-pembelajaran.bahan-ajar.list',
              idKelas,
              idSesi,
            ],
          })
          onHide()
        },
        onError: ({ message }) => setFormError(message),
      }
    )
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Bagikan Materi"
      desc="Lampirkan materi yang ingin Kamu bagikan, dapat berupa gambar, video, link video, atau dokumen"
      size="lg"
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahMateriSesiFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
      >
        {({ control, watch, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledSwitch
                name="share"
                control={control}
                label="Bagikan dari Bank Materi"
              />

              {watch('share') ? (
                <ControlledMateri
                  name="materi"
                  control={control}
                  errors={errors}
                  type="materi"
                />
              ) : (
                <>
                  <ControlledInput
                    name="judul"
                    control={control}
                    errors={errors}
                    label="Judul Materi"
                    placeholder="Tulis judul materi di sini"
                    required
                  />

                  <ControlledQuillEditor
                    name="catatan"
                    control={control}
                    errors={errors}
                    label="Catatan Tambahan"
                    placeholder="Buat catatan singkat terkait materi yang diberikan"
                    toolbar="minimalist"
                  />

                  <ControlledPustakaMedia
                    name="berkas"
                    control={control}
                    label="Pilih Berkas"
                    errors={errors}
                    multiple
                  />
                </>
              )}

              <FormError error={formError} />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Bagikan Sekarang"
              isSubmitting={isSubmitting}
              onCancel={handleClose}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
