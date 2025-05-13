import { tambahAktifitasMateriAction } from '@/services/api/pengguna/ruang-kelas/aktifitas/akademik/tambah-materi'
import {
  CardSeparator,
  ControlledDatePicker,
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
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
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

const isPenjadwalanFs = z.object({
  penjadwalan: z.literal(true),
  jadwal: z.date(),
})

const isNotPenjadwalanFs = z.object({
  penjadwalan: z.literal(false),
})

const formSchema = z.union([
  isShareFs.merge(isPenjadwalanFs),
  isShareFs.merge(isNotPenjadwalanFs),
  isNotShareFs.merge(isPenjadwalanFs),
  isNotShareFs.merge(isNotPenjadwalanFs),
])

export type TambahMateriFormSchema = {
  share: boolean
  materi?: MateriItemType
  judul?: string
  catatan?: string
  penjadwalan: boolean
  jadwal?: Date
  berkas?: PustakaMediaFileType[]
}

const initialValues: TambahMateriFormSchema = {
  penjadwalan: false,
  share: true,
  berkas: [],
}

type TambahMateriModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function TambahMateriModal({
  show = false,
  setShow,
}: TambahMateriModalProps) {
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const onSubmit: SubmitHandler<TambahMateriFormSchema> = async (data) => {
    await handleActionWithToast(tambahAktifitasMateriAction(idKelas, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShow(false)
        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.linimasa.list', idKelas],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Bagikan Materi"
      desc="Lampirkan materi yang ingin Kamu bagikan, dapat berupa gambar, video, link video, atau dokumen"
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahMateriFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
        flexing
      >
        {({ control, watch, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col">
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
              </div>

              <CardSeparator />

              <div className="flex gap-x-4 gap-y-1 flex-wrap p-3">
                <ControlledSwitch
                  name="penjadwalan"
                  control={control}
                  label="Opsi Penjadwalan"
                />
                {watch('penjadwalan', false) && (
                  <ControlledDatePicker
                    name="jadwal"
                    control={control}
                    errors={errors}
                    placeholder="Atur Tanggal dan Jam Terbit"
                    showTimeSelect
                    dateFormat="dd MMMM yyyy HH:mm"
                    timeFormat="HH:mm"
                    className="flex-1 min-w-72"
                  />
                )}
              </div>

              <div className="px-3">
                <FormError error={formError} />
              </div>
            </div>

            <ModalFooterButtons
              submit="Bagikan Sekarang"
              isSubmitting={isSubmitting}
              onCancel={handleClose}
              borderTop
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
