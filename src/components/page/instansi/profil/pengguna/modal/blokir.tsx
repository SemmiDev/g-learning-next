import {
  CardSeparator,
  ControlledInput,
  Form,
  Modal,
  ModalFooterButtons,
  Text,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  alasan: z.string().pipe(required),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  alasan?: string
}

const initialValues: FormSchema = {}

type BlokirModalProps = {
  showModal: boolean
  setShowModal(show: boolean): void
}

export default function BlokirModal({
  showModal,
  setShowModal,
}: BlokirModalProps) {
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <Modal
      title="Blokir Pengguna"
      size="sm"
      color="danger"
      headerClassName="[&_.modal-title]:text-lg"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      closeButton={false}
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
            <div className="space-y-3 p-3">
              <Text weight="semibold" variant="dark" className="text-center">
                Yakin ingin memblokir pengguna ini di instansi anda? Tuliskan
                alasan pemblokiran
              </Text>

              <ControlledInput
                name="alasan"
                control={control}
                errors={errors}
                placeholder="Alasan pemblokiran pengguna"
              />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Blokir Pengguna"
              submitColor="danger"
              isSubmitting={isSubmitting}
              cancel="Batal"
              onCancel={() => {
                setShowModal(false)
              }}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
