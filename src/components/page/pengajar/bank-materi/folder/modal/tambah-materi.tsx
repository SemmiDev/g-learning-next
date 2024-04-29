import { Button, CardSeparator, Modal } from '@/components/ui'
import { Form } from '@/components/ui/form'
import { SubmitHandler } from 'react-hook-form'
import { z } from '@/utils/zod-id'
import { required } from '@/utils/validations/pipe'
import ControlledInput from '@/components/ui/controlled/input'
import ModalFooterButtons from '@/components/ui/modal/footer-buttons'

const formSchema = z.object({
  judul: z.string().pipe(required),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  judul?: string
}

const initialValues: FormSchema = {}

export default function TambahMateriModal({
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
      title="Tambah Materi Baru"
      desc="Buat materi ajar terkait kelas yang kamu kelola"
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
                name="judul"
                control={control}
                errors={errors}
                label="Judul Materi"
                placeholder="Tulis judul materi di sini"
              />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Tambah Materi"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
