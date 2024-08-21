import {
  CardSeparator,
  ControlledUploadFile,
  Form,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  foto: z.any().superRefine(objectRequired),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  foto?: any
}

const initialValues: FormSchema = {}

export default function UbahFotoModal({
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
      title="Ganti Foto Profil"
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
        {({ control, formState: { errors, isSubmitting } }) => {
          return (
            <>
              <div className="flex flex-col gap-4 p-3">
                <ControlledUploadFile
                  name="foto"
                  control={control}
                  errors={errors}
                  accept={{ 'image/*': [] }}
                />
              </div>

              <CardSeparator />

              <ModalFooterButtons
                submit="Upload"
                isSubmitting={isSubmitting}
                onCancel={() => setShowModal(false)}
              />
            </>
          )
        }}
      </Form>
    </Modal>
  )
}
