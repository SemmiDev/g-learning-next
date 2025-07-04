import {
  ControlledPassword,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { ubahPassowrdApi } from '@/services/api/admin/profil/ubah-password'
import { handleActionWithToast } from '@/utils/action'
import { requiredPassword } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z
  .object({
    passwordLama: z.string().pipe(requiredPassword),
    passwordBaru: z.string().pipe(requiredPassword),
    ulangiPassword: z.string().pipe(requiredPassword),
  })
  .refine((data) => data.passwordBaru === data.ulangiPassword, {
    message: 'Password baru dan ulangi password baru harus sama.',
    path: ['ulangiPassword'],
  })

type UbahPasswordFormSchema = {
  passwordLama?: string
  passwordBaru?: string
  ulangiPassword?: string
}

type UbahPasswordModalProps = {
  show: boolean
  setShow(show: boolean): void
}

const initialValues = {}

export default function UbahPasswordModal({
  show,
  setShow,
}: UbahPasswordModalProps) {
  const { processApi } = useSessionJwt()

  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<UbahPasswordFormSchema> = async (data) => {
    await handleActionWithToast(processApi(ubahPassowrdApi, data), {
      loading: 'Menyimpan...',
      error: ({ message }) => message,
      onStart: () => setFormError(undefined),
      onSuccess: () => setShow(false),
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ganti Kata Sandi"
      color="warning"
      isOpen={show}
      onClose={handleClose}
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
                required
              />

              <ControlledPassword
                name="passwordBaru"
                control={control}
                errors={errors}
                label="Kata Sandi Baru"
                placeholder="Kata Sandi Baru"
                required
              />

              <ControlledPassword
                name="ulangiPassword"
                control={control}
                errors={errors}
                label="Ulangi Kata Sandi Baru"
                placeholder="Ulangi Kata Sandi Baru"
                required
              />

              <FormError error={formError} />
            </div>

            <ModalFooterButtons
              submit="Simpan Sandi Baru"
              submitColor="warning"
              submitClassName="text-nowrap"
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
