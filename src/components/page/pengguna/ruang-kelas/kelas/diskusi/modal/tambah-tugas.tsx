import { tambahAktifitasTugasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/tambah-tugas'
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

const isDibatasiWaktuFs = z.object({
  dibawasiWaktu: z.literal(true),
  batasWaktu: z.date(),
})

const isNotDibatasiWaktuFs = z.object({
  dibawasiWaktu: z.literal(false),
})

const formSchema = z.union([
  isShareFs.merge(isDibatasiWaktuFs),
  isShareFs.merge(isNotDibatasiWaktuFs),
  isNotShareFs.merge(isDibatasiWaktuFs),
  isNotShareFs.merge(isNotDibatasiWaktuFs),
])

export type TambahTugasFormSchema = {
  share: boolean
  materi?: MateriItemType
  judul?: string
  catatan?: string
  dibawasiWaktu: boolean
  batasWaktu?: Date
  berkas?: PustakaMediaFileType[]
}

const initialValues: TambahTugasFormSchema = {
  dibawasiWaktu: false,
  share: true,
  berkas: [],
}

type TambahTugasModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function TambahTugasModal({
  show = false,
  setShow,
}: TambahTugasModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const onSubmit: SubmitHandler<TambahTugasFormSchema> = async (data) => {
    await handleActionWithToast(tambahAktifitasTugasAction(idKelas, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShow(false)
        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.diskusi.list', idKelas],
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
    <Modal title="Bagikan Tugas" size="lg" isOpen={show} onClose={handleClose}>
      <Form<TambahTugasFormSchema>
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
                  type="tugas"
                />
              ) : (
                <>
                  <ControlledInput
                    name="judul"
                    control={control}
                    errors={errors}
                    label="Judul Tugas"
                    placeholder="Tulis judul tugas di sini"
                    required
                  />

                  <ControlledQuillEditor
                    name="catatan"
                    control={control}
                    errors={errors}
                    label="Catatan Tambahan"
                    placeholder="Buat catatan singkat terkait tugas yang diberikan"
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

              <div className="flex gap-x-4 px-3 py-3">
                <ControlledSwitch
                  name="dibawasiWaktu"
                  control={control}
                  label="Opsi Batas Waktu Penyerahan"
                />
                {watch('dibawasiWaktu', false) && (
                  <ControlledDatePicker
                    name="batasWaktu"
                    control={control}
                    errors={errors}
                    placeholder="Atur Tanggal dan Jam Batas Waktu"
                    showTimeSelect
                    dateFormat="dd MMMM yyyy HH:mm"
                    timeFormat="HH:mm"
                    className="flex-1"
                  />
                )}
              </div>
            </div>

            <div className="px-3">
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
