import { Button, CardSeparator, Modal } from '@/components/ui'
import { Form } from '@/components/ui/form'
import { SubmitHandler } from 'react-hook-form'
import { z } from '@/utils/zod-id'
import { required } from '@/utils/validations/pipe'
import ControlledInput from '@/components/ui/controlled/input'

const formSchema = z.object({
  nama: z.string().pipe(required),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  nama?: string
}

const initialValues: FormSchema = {}

export default function TambahFolderModal({
  showModal = false,
  setShowModal,
}: {
  showModal?: boolean
  setShowModal(show: boolean): void
}) {
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <Modal
      title="Tambah Folder Baru"
      desc="Buat folder baru untuk menyimpan materi Kamu"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Form<FormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledInput
                label="Nama Folder"
                placeholder="Tulis nama folder di sini"
                name="nama"
                control={control}
                errors={errors}
              />
            </div>
            <CardSeparator />

            <div className="flex gap-2 p-3">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                Buat Folder Baru
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowModal(false)}
              >
                Batal
              </Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  )
}
