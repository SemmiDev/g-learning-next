import { tambahAdminAction } from '@/actions/admin/admin/tambah'
import {
  CardSeparator,
  ControlledInput,
  ControlledPassword,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
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
  showModal?: boolean
  setShowModal(show: boolean): void
}

export default function TambahModal({
  showModal = false,
  setShowModal,
}: TambahModalProps) {
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
