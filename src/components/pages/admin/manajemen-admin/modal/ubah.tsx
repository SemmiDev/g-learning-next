import {
  ControlledInput,
  ControlledPassword,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  TextSpan,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatAdminApi } from '@/services/api/admin/admin/lihat'
import { ubahAdminApi } from '@/services/api/admin/admin/ubah'
import { handleActionWithToast } from '@/utils/action'
import { required, requiredPassword } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z
  .object({
    nama: z.string().pipe(required),
    username: z.string().pipe(required),
    password: z.string().pipe(requiredPassword).optional().or(z.literal('')),
    ulangiPassword: z
      .string()
      .pipe(requiredPassword)
      .optional()
      .or(z.literal('')),
  })
  .refine(
    (data) =>
      (!data.password && !data.ulangiPassword) ||
      data.password === data.ulangiPassword,
    {
      message: 'Password baru dan ulangi password baru harus sama.',
      path: ['ulangiPassword'],
    }
  )

export type UbahAdminFormSchema = {
  nama?: string
  username?: string
  password?: string
  ulangiPassword?: string
}

type UbahModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahModal({ id, show, onHide }: UbahModalProps) {
  const { jwt, processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeMediumModal()
  const [formError, setFormError] = useState<string>()

  const queryKey = ['admin.manajemen-admin.table.ubah', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahAdminFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatAdminApi(jwt, id)

      return {
        nama: data?.nama,
        username: data?.username,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahAdminFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(processApi(ubahAdminApi, id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['admin.manajemen-admin.table'],
        })
        queryClient.setQueryData(queryKey, (oldData: UbahAdminFormSchema) => ({
          ...oldData,
          ...data,
        }))
        onHide()
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ubah Admin"
      isLoading={!isLoading && isFetching}
      color="warning"
      size={size}
      isOpen={show}
      onClose={handleClose}
    >
      {isLoading ? (
        <Loader height={336} />
      ) : (
        <Form<UbahAdminFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
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
                  label={
                    <TextSpan>
                      Kata Sandi Baru{' '}
                      <small>(Kosongkan jika tidak ingin mengganti)</small>
                    </TextSpan>
                  }
                  placeholder="Kata sandi baru admin"
                />

                <ControlledPassword
                  name="ulangiPassword"
                  control={control}
                  errors={errors}
                  label={
                    <TextSpan>
                      Ulangi Kata Sandi Baru{' '}
                      <small>(Kosongkan jika tidak ingin mengganti)</small>
                    </TextSpan>
                  }
                  placeholder="Ketik ulang kata sandi baru"
                />

                <FormError error={formError} />
              </div>

              <ModalFooterButtons
                submit="Simpan"
                submitColor="warning"
                isSubmitting={isSubmitting}
                onCancel={handleClose}
                borderTop
              />
            </>
          )}
        </Form>
      )}
    </Modal>
  )
}
