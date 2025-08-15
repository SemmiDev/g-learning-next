import {
  ControlledAsyncPaginateSelect,
  ControlledInput,
  ControlledPassword,
  ControlledRadioGroup,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  RadioGroupOptionType,
  SelectOptionType,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { fakultasSelectDataApi } from '@/services/api/instansi/async-select/fakultas'
import { prodiSelectDataApi } from '@/services/api/instansi/async-select/prodi'
import { tambahAdminProdiApi } from '@/services/api/instansi/profil/manajemen-prodi/tambah'
import { handleActionWithToast } from '@/utils/action'
import { radioGroupOption } from '@/utils/object'
import { required, requiredPassword } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z
  .object({
    tipe: z.string(),
    fakultas: z.object({ label: z.string(), value: z.string() }).nullish(),
    prodi: z.object({ label: z.string(), value: z.string() }).nullish(),
    nama: z.string().pipe(required),
    username: z.string().pipe(required),
    password: z.string().pipe(requiredPassword),
    ulangiPassword: z.string().pipe(requiredPassword),
  })
  .refine(
    (data) =>
      data.tipe !== 'Fakultas' || (data.tipe === 'Fakultas' && !!data.fakultas),
    {
      message: 'Fakultas harus dipilih.',
      path: ['fakultas'],
    }
  )
  .refine(
    (data) => data.tipe !== 'Prodi' || (data.tipe === 'Prodi' && !!data.prodi),
    {
      message: 'Program Studi harus dipilih.',
      path: ['prodi'],
    }
  )
  .refine((data) => data.password === data.ulangiPassword, {
    message: 'Password dan ulangi password harus sama.',
    path: ['ulangiPassword'],
  })

export type TambahAdminProdiFormSchema = {
  tipe?: string
  fakultas?: SelectOptionType | null
  prodi?: SelectOptionType | null
  nama?: string
  username?: string
  password?: string
  ulangiPassword?: string
}

const tipeOptions: RadioGroupOptionType[] = [
  radioGroupOption('Fakultas'),
  radioGroupOption('Prodi'),
]

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
        {({
          control,
          watch,
          setValue,
          formState: { errors, isSubmitting },
        }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledRadioGroup
                name="tipe"
                control={control}
                options={tipeOptions}
                label="Tipe"
                errors={errors}
                onChange={(item) => {
                  if (item.value === 'Fakultas') {
                    setValue('prodi', null)
                  } else {
                    setValue('fakultas', null)
                  }
                }}
                required
              />

              {watch('tipe') === 'Fakultas' && (
                <ControlledAsyncPaginateSelect
                  name="fakultas"
                  control={control}
                  label="Fakultas"
                  placeholder="Pilih Fakultas"
                  action={fakultasSelectDataApi}
                  construct={(data) => ({
                    label: data.nm_lemb,
                    value: data.id,
                  })}
                  errors={errors}
                  required
                />
              )}

              {watch('tipe') === 'Prodi' && (
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
              )}

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
