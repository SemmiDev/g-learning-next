import { tambahAktifitasDiskusiAction } from '@/actions/pengguna/ruang-kelas/aktifitas/tambah-diskusi'
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
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const onSubmit: SubmitHandler<TambahDiskusiFormSchema> = async (data) => {
    await handleActionWithToast(tambahAktifitasDiskusiAction(idKelas, data), {
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
      title="Bagikan Diskusi"
      size="lg"
      isOpen={show}
      onClose={handleClose}
    >
      <Form<TambahDiskusiFormSchema>
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
