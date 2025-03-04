import { tambahAktifitasInformasiAction } from '@/actions/pengguna/ruang-kelas/aktifitas/umum/tambah-informasi'
import {
  CardSeparator,
  ControlledDatePicker,
  ControlledInput,
  ControlledPustakaMedia,
  ControlledQuillEditor,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  PustakaMediaFileType,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Switch } from 'rizzui'

const baseFormSchema = z.object({
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
  berkas: z.array(z.any()),
})

const formSchema = z.discriminatedUnion('penjadwalan', [
  z
    .object({
      penjadwalan: z.literal(false),
    })
    .merge(baseFormSchema),
  z
    .object({
      penjadwalan: z.literal(true),
      jadwal: z.date(),
    })
    .merge(baseFormSchema),
])

export type TambahInformasiFormSchema = {
  judul?: string
  catatan?: string
  penjadwalan: boolean
  jadwal?: Date
  berkas?: PustakaMediaFileType[]
}

const initialValues: TambahInformasiFormSchema = {
  penjadwalan: false,
  berkas: [],
}

type TambahInformasiModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function TambahInformasiModal({
  show = false,
  setShow,
}: TambahInformasiModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const onSubmit: SubmitHandler<TambahInformasiFormSchema> = async (data) => {
    await handleActionWithToast(tambahAktifitasInformasiAction(idKelas, data), {
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
    <Modal
      title="Bagikan Informasi"
      size="lg"
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahInformasiFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
      >
        {({
          register,
          control,
          watch,
          formState: { errors, isSubmitting },
        }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledInput
                name="judul"
                control={control}
                errors={errors}
                label="Judul Informasi"
                placeholder="Tulis judul informasi di sini"
                required
              />

              <ControlledQuillEditor
                name="catatan"
                control={control}
                errors={errors}
                size="md"
                label="Catatan Tambahan"
                placeholder="Buat catatan terkait informasi yang diberikan"
              />

              <ControlledPustakaMedia
                name="berkas"
                control={control}
                label="Pilih Berkas"
                errors={errors}
                multiple
              />
            </div>

            <CardSeparator />

            <div className="flex gap-x-4 px-3 py-3">
              <Switch
                label="Opsi Penjadwalan"
                labelClassName="text-gray-dark font-semibold"
                {...register('penjadwalan')}
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
                  className="flex-1"
                />
              )}
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
