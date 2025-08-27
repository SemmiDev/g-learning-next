import {
  ContentLoader,
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
  TextSpan,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { fakultasSelectDataApi } from '@/services/api/instansi/async-select/fakultas'
import { prodiSelectDataApi } from '@/services/api/instansi/async-select/prodi'
import { lihatAdminProdiApi } from '@/services/api/instansi/profil/manajemen-prodi/lihat'
import { ubahAdminProdiApi } from '@/services/api/instansi/profil/manajemen-prodi/ubah'
import { handleActionWithToast } from '@/utils/action'
import { radioGroupOption } from '@/utils/object'
import { required, requiredPassword } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import _ from 'lodash'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z
  .object({
    tipe: z.string(),
    fakultas: z.object({ label: z.string(), value: z.string() }).nullish(),
    prodi: z.object({ label: z.string(), value: z.string() }).nullish(),
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
  .refine(
    (data) =>
      (!data.password && !data.ulangiPassword) ||
      data.password === data.ulangiPassword,
    {
      message: 'Password baru dan ulangi password baru harus sama.',
      path: ['ulangiPassword'],
    }
  )

export type UbahAdminProdiFormSchema = {
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

type UbahModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahModal({ id, show, onHide }: UbahModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeMediumModal()

  const [formError, setFormError] = useState<string>()

  const queryKey = ['instansi.profil.manajemen-prodi.table.ubah', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahAdminProdiFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await processApi(lihatAdminProdiApi, id)

      return {
        tipe: data?.tipe,
        fakultas:
          data?.tipe === 'Fakultas' && data.id_sms
            ? { label: data.nm_lemb, value: data.id_sms }
            : undefined,
        prodi:
          data?.tipe === 'Prodi' && data.id_sms
            ? { label: data.nm_lemb, value: data.id_sms }
            : undefined,
        nama: data?.nama,
        username: data?.username,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahAdminProdiFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(processApi(ubahAdminProdiApi, id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['instansi.profil.manajemen-prodi.table'],
        })
        queryClient.invalidateQueries({
          queryKey: ['instansi.profil.manajemen-prodi.table.ubah', id],
        })
        queryClient.invalidateQueries({
          queryKey: ['instansi.profil.manajemen-prodi.detail', id],
        })
        queryClient.setQueryData(
          queryKey,
          (oldData: UbahAdminProdiFormSchema) => ({
            ...oldData,
            ..._.pick(data, ['prodi', 'nama', 'username']),
          })
        )
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
      overflow
    >
      {isLoading ? (
        <ContentLoader height={336} />
      ) : (
        <Form<UbahAdminProdiFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
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
                  label={
                    <TextSpan>
                      Kata Sandi Baru{' '}
                      <small>(Kosongkan jika tidak ingin mengganti)</small>
                    </TextSpan>
                  }
                  placeholder="Masukkan Kata Sandi Baru"
                  required
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
                  placeholder="Ulangi Kata Sandi Baru"
                  required
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
