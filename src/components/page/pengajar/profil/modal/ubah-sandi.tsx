import {
  ControlledPassword,
  Form,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z
  .object({
    passwordLama: z.string().pipe(required),
    passwordBaru: z.string().pipe(required),
    ulangiPassword: z.string().pipe(required),
  })
  .refine((data) => data.passwordBaru === data.ulangiPassword, {
    message: 'Password baru dan ulangi password baru harus sama.',
    path: ['ulangiPassword'],
  })

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  passwordLama?: string
  passwordBaru?: string
  ulangiPassword?: string
}

type UbahModalProps = {
  showModal: boolean
  setShowModal(show: boolean): void
}

export default function UbahSandiModal({
  showModal,
  setShowModal,
}: UbahModalProps) {
  const [initialValues, setInitialValues] = useState<FormSchema>()

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <Modal
      title="Ganti Kata Sandi"
      color="warning"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Form<FormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues ?? {},
        }}
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledPassword
                name="passwordLama"
                control={control}
                errors={errors}
                label="Kata Sandi Lama"
                placeholder="Kata Sandi Lama"
              />

              <ControlledPassword
                name="passwordBaru"
                control={control}
                errors={errors}
                label="Kata Sandi Baru"
                placeholder="Kata Sandi Baru"
              />

              <ControlledPassword
                name="ulangiPassword"
                control={control}
                errors={errors}
                label="Ulangi Kata Sandi Baru"
                placeholder="Ulangi Kata Sandi Baru"
              />
            </div>

            <ModalFooterButtons
              submit="Simpan Sandi Baru"
              submitColor="warning"
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
