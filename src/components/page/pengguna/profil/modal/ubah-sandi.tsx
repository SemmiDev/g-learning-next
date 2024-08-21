import { ubahPassowrdAction } from '@/actions/pengguna/profil/ubah-password'
import {
  CardSeparator,
  ControlledPassword,
  Form,
  Modal,
  ModalFooterButtons,
  Text,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { required, requiredPassword } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Alert } from 'rizzui'

const formSchema = z
  .object({
    passwordLama: z
      .string()
      .pipe(required.min(8, 'Kata sandi minimal 8 karakter')),
    passwordBaru: z
      .string()
      .pipe(requiredPassword.min(8, 'Kata sandi minimal 8 karakter')),
    ulangiPassword: z
      .string()
      .pipe(requiredPassword.min(8, 'Kata sandi minimal 8 karakter')),
  })
  .refine((data) => data.passwordBaru === data.ulangiPassword, {
    message: 'Password baru dan ulangi password baru harus sama.',
    path: ['ulangiPassword'],
  })

export type UbahPasswordFormSchema = {
  passwordLama?: string
  passwordBaru?: string
  ulangiPassword?: string
}

type UbahModalProps = {
  showModal: boolean
  setShowModal(show: boolean): void
}

const initialValues = {}

export default function UbahSandiModal({
  showModal,
  setShowModal,
}: UbahModalProps) {
  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<UbahPasswordFormSchema> = (data) => {
    handleActionWithToast(ubahPassowrdAction(data), {
      loading: 'Menyimpan...',
      success: 'Berhasil mengubah kata sandi',
      error: ({ message }) => message,
      onStart: () => setFormError(undefined),
      onSuccess: () => setShowModal(false),
      onError: ({ message }) => setFormError(message),
    })
  }

  return (
    <Modal
      title="Ganti Kata Sandi"
      color="warning"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Form<UbahPasswordFormSchema>
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

              {formError && (
                <Alert size="sm" variant="flat" color="danger">
                  <Text size="sm" weight="medium">
                    {formError}
                  </Text>
                </Alert>
              )}
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Simpan Sandi Baru"
              submitColor="warning"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
