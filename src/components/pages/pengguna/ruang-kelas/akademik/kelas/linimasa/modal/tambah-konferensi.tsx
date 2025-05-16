import {
  CardSeparator,
  ControlledDatePicker,
  ControlledInput,
  ControlledQuillEditor,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { tambahAktifitasKonferensiApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/akademik/tambah-konferensi'
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
  link: z.string().pipe(required.url()),
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

export type TambahKonferensiFormSchema = {
  judul?: string
  catatan?: string
  link?: string
  penjadwalan: boolean
  jadwal?: Date
}

const initialValues: TambahKonferensiFormSchema = {
  penjadwalan: false,
}

type TambahKonferensiModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function TambahKonferensiModal({
  show = false,
  setShow,
}: TambahKonferensiModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()

  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const onSubmit: SubmitHandler<TambahKonferensiFormSchema> = async (data) => {
    await handleActionWithToast(
      processApi(tambahAktifitasKonferensiApi, idKelas, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          setShow(false)
          queryClient.invalidateQueries({
            queryKey: ['pengguna.ruang-kelas.linimasa.list', idKelas],
          })
        },
        onError: ({ message }) => setFormError(message),
      }
    )
  }

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Bagikan Konferensi"
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahKonferensiFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
        flexing
      >
        {({
          register,
          control,
          watch,
          formState: { errors, isSubmitting },
        }) => (
          <>
            <div className="flex flex-col">
              <div className="flex flex-col gap-4 p-3">
                <ControlledInput
                  name="judul"
                  control={control}
                  errors={errors}
                  label="Judul Konferensi"
                  placeholder="Tulis judul konferensi di sini"
                  required
                />

                <ControlledQuillEditor
                  name="catatan"
                  control={control}
                  errors={errors}
                  label="Catatan Tambahan"
                  placeholder="Buat catatan singkat terkait konferensi yang diberikan"
                  toolbar="minimalist"
                />

                <ControlledInput
                  name="link"
                  control={control}
                  errors={errors}
                  label="Link Konferensi"
                  placeholder="Tulis link konferensi di sini"
                  required
                />
              </div>

              <CardSeparator />

              <div className="flex gap-x-4 gap-y-1 flex-wrap p-3">
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
