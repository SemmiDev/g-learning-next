import { tambahAdminAction } from '@/actions/admin/admin/tambah-admin'
import {
  CardSeparator,
  ControlledInput,
  ControlledPassword,
  Form,
  Modal,
  ModalFooterButtons,
  Text,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { required, requiredPassword } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Alert } from 'rizzui'

const formSchema = z
  .object({
    nama: z.string().pipe(required),
    username: z.string().pipe(required),
    password: z
      .string()
      .pipe(requiredPassword.min(8, 'Kata sandi minimal 8 karakter')),
    ulangiPassword: z
      .string()
      .pipe(requiredPassword.min(8, 'Kata sandi minimal 8 karakter')),
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

export default function TambahModal({
  showModal = false,
  setShowModal,
}: {
  showModal?: boolean
  setShowModal(show: boolean): void
}) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<TambahAdminFormSchema> = async (data) => {
    await handleActionWithToast(tambahAdminAction(data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShowModal(false)
        queryClient.invalidateQueries({
          queryKey: ['admin.manajemen-admin.table'],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  return (
    <Modal
      title="Tambah Admin"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Form<TambahAdminFormSchema>
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
                name="username"
                control={control}
                errors={errors}
                label="Username"
                placeholder="Username admin"
              />

              <ControlledInput
                name="nama"
                control={control}
                errors={errors}
                label="Nama Lengkap"
                placeholder="Nama lengkap admin"
              />

              <ControlledPassword
                name="password"
                control={control}
                errors={errors}
                label="Kata Sandi"
                placeholder="Kata sandi admin"
              />

              <ControlledPassword
                name="ulangiPassword"
                control={control}
                errors={errors}
                label="Ulangi Kata Sandi"
                placeholder="Ketik ulang kata sandi"
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
              submit="Simpan"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
