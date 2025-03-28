import {
  ControlledInput,
  Form,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nama: z.string().pipe(required),
})

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
                name="nama"
                control={control}
                errors={errors}
                label="Nama Folder"
                placeholder="Tulis nama folder di sini"
              />
            </div>

            <ModalFooterButtons
              submit="Buat Folder Baru"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
              borderTop
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
