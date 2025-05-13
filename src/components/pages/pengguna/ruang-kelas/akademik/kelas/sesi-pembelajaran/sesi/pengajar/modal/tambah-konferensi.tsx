import { tambahAktifitasKonferensiSesiAction } from '@/services/api/pengguna/ruang-kelas/aktifitas/sesi/tambah-konferensi'
import {
  ControlledInput,
  ControlledQuillEditor,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  RadioGroupOptionType,
} from '@/components/ui'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
  link: z.string().pipe(required.url()),
})

export type TambahKonferensiSesiFormSchema = {
  judul?: string
  catatan?: string
  link?: string
}

const initialValues: TambahKonferensiSesiFormSchema = {}

const presensiOptions: RadioGroupOptionType[] = [
  { label: 'Aktif', value: 'aktif' },
  { label: 'Tidak Aktif', value: 'non-aktif' },
]

type TambahKonferensiSesiModalProps = {
  idSesi: string | undefined
  show?: boolean
  onHide: () => void
}

export default function TambahKonferensiSesiModal({
  idSesi,
  show = false,
  onHide,
}: TambahKonferensiSesiModalProps) {
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const onSubmit: SubmitHandler<TambahKonferensiSesiFormSchema> = async (
    data
  ) => {
    if (!idSesi) return

    await handleActionWithToast(
      tambahAktifitasKonferensiSesiAction(idKelas, idSesi, data),
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
          queryClient.invalidateQueries({
            queryKey: [
              'pengguna.ruang-kelas.sesi-pembelajaran.list',
              'pengajar',
              idKelas,
            ],
          })
          queryClient.invalidateQueries({
            queryKey: ['pengguna.ruang-kelas.linimasa.list-jadwal-kelas'],
          })
          queryClient.invalidateQueries({
            queryKey: ['pengguna.ruang-kelas.linimasa.list', idKelas],
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
      title="Bagikan Konferensi"
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahKonferensiSesiFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
        flexing
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
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

              <FormError error={formError} />
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
