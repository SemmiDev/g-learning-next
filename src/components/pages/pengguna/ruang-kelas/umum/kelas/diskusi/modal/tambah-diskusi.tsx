import {
  ControlledInput,
  ControlledQuillEditor,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { tambahAktifitasDiskusiApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/umum/tambah-diskusi'
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
})

export type TambahDiskusiFormSchema = {
  judul?: string
  catatan?: string
}

const initialValues: TambahDiskusiFormSchema = {}

type TambahDiskusiModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function TambahDiskusiModal({
  show = false,
  setShow,
}: TambahDiskusiModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()

  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const onSubmit: SubmitHandler<TambahDiskusiFormSchema> = async (data) => {
    await handleActionWithToast(
      processApi(tambahAktifitasDiskusiApi, idKelas, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          setShow(false)
          queryClient.invalidateQueries({
            queryKey: ['pengguna.ruang-kelas.diskusi.list', idKelas],
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
      title="Bagikan Diskusi"
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahDiskusiFormSchema>
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
            <div className="flex flex-col">
              <div className="flex flex-col gap-4 p-3">
                <ControlledInput
                  name="judul"
                  control={control}
                  errors={errors}
                  label="Judul Diskusi"
                  placeholder="Tulis judul diskusi di sini"
                  required
                />

                <ControlledQuillEditor
                  name="catatan"
                  control={control}
                  errors={errors}
                  size="md"
                  label="Catatan Tambahan"
                  placeholder="Buat catatan terkait diskusi yang diberikan"
                />
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
