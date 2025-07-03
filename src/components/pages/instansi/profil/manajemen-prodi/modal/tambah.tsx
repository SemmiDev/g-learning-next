import {
  ControlledAsyncPaginateSelect,
  ControlledInput,
  ControlledPassword,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { prodiSelectDataApi } from '@/services/api/instansi/async-select/prodi'
import { tambahAdminProdiApi } from '@/services/api/instansi/profil/manajemen-prodi/tambah'
import { handleActionWithToast } from '@/utils/action'
import { required, requiredPassword } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { wait } from '@/utils/wait'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z
  .object({
    prodi: z.any().superRefine(objectRequired),
    nama: z.string().pipe(required),
    username: z.string().pipe(required),
    password: z.string().pipe(requiredPassword),
    ulangiPassword: z.string().pipe(requiredPassword),
  })
  .refine((data) => data.password === data.ulangiPassword, {
    message: 'Password dan ulangi password harus sama.',
    path: ['ulangiPassword'],
  })

export type TambahAdminProdiFormSchema = {
  prodi?: SelectOptionType
  nama?: string
  username?: string
  password?: string
  ulangiPassword?: string
}

const initialValues: TambahAdminProdiFormSchema = {}

type TambahModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function TambahModal({
  show = false,
  setShow,
}: TambahModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeMediumModal()

  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<TambahAdminProdiFormSchema> = async (data) => {
    await handleActionWithToast(processApi(tambahAdminProdiApi, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShow(false)
        queryClient.invalidateQueries({
          queryKey: ['instansi.profil.manajemen-prodi.table'],
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
    <Modal
      title="Tambah Admin Prodi"
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahAdminProdiFormSchema>
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
              <ControlledAsyncPaginateSelect
                name="prodi"
                control={control}
                label="Program Studi"
                placeholder="Pilih Program Studi"
                action={prodiSelectDataApi}
                construct={(data) => ({
                  label: data.nm_lemb,
                  value: data.id,
                })}
                errors={errors}
                required
              />

              <ControlledInput
                name="nama"
                control={control}
                errors={errors}
                label="Nama Lengkap"
                placeholder="Masukkan Nama Lengkap"
                required
              />

              <ControlledInput
                name="username"
                control={control}
                errors={errors}
                label="Username"
                placeholder="Masukkan Username"
                required
              />

              <ControlledPassword
                name="password"
                control={control}
                errors={errors}
                label="Kata Sandi"
                placeholder="Masukkan Kata Sandi"
                required
              />
              <ControlledPassword
                name="ulangiPassword"
                control={control}
                errors={errors}
                label="Ulangi Kata Sandi"
                placeholder="Ulangi Kata Sandi"
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
