import {
  ControlledInput,
  ControlledPassword,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { tambahAdminApi } from '@/services/api/admin/admin/tambah'
import { handleActionWithToast } from '@/utils/action'
import { required, requiredPassword } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z
  .object({
    nama: z.string().pipe(required),
    username: z.string().pipe(required),
    password: z.string().pipe(requiredPassword),
    ulangiPassword: z.string().pipe(requiredPassword),
  })
  .refine((data) => data.password === data.ulangiPassword, {
    message: 'Password dan ulangi password harus sama.',
    path: ['ulangiPassword'],
  })

export type TambahAdminFormSchema = {
  nama?: string
  username?: string
  password?: string
  ulangiPassword?: string
}

const initialValues: TambahAdminFormSchema = {}

type TambahModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function TambahModal({
  show = false,
  setShow,
}: TambahModalProps) {
  const { jwt } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeMediumModal()

  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<TambahAdminFormSchema> = async (data) => {
    await handleActionWithToast(tambahAdminApi(jwt, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShow(false)
        queryClient.invalidateQueries({
          queryKey: ['admin.manajemen-admin.table'],
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
    <Modal title="Tambah Admin" size={size} isOpen={show} onClose={handleClose}>
      <Form<TambahAdminFormSchema>
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
            <div className="flex flex-col gap-4 p-3">
              <ControlledInput
                name="username"
                control={control}
                errors={errors}
                label="Username"
                placeholder="Username admin"
                required
              />

              <ControlledInput
                name="nama"
                control={control}
                errors={errors}
                label="Nama Lengkap"
                placeholder="Nama lengkap admin"
                required
              />

              <ControlledPassword
                name="password"
                control={control}
                errors={errors}
                label="Kata Sandi"
                placeholder="Kata sandi admin"
                required
              />

              <ControlledPassword
                name="ulangiPassword"
                control={control}
                errors={errors}
                label="Ulangi Kata Sandi"
                placeholder="Ketik ulang kata sandi"
                required
              />

              <FormError error={formError} />
            </div>

            <ModalFooterButtons
              submit="Simpan"
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
