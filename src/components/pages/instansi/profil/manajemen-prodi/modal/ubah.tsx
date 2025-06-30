import {
  ControlledInput,
  ControlledPassword,
  ControlledSelect,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
  TextSpan,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { required, requiredPassword } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { wait } from '@/utils/wait'
import { z } from '@/utils/zod-id'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z
  .object({
    prodi: z.any().superRefine(objectRequired),
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

export type UbahProdiFormSchema = {
  prodi?: SelectOptionType
  nama?: string
  username?: string
  password?: string
  ulangiPassword?: string
}

const prodiOptions: SelectOptionType[] = [
  { label: 'Teknik Informatika', value: '1' },
  { label: 'Teknik Komputer', value: '2' },
  { label: 'Sistem Informasi', value: '3' },
  { label: 'Bahasa', value: '4' },
  { label: 'Teknik Elektro', value: '5' },
]

type UbahModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahModal({ id, show, onHide }: UbahModalProps) {
  // const { processApi } = useSessionJwt()
  // const queryClient = useQueryClient()
  const size = useAutoSizeMediumModal()
  const [formError, setFormError] = useState<string>()

  const queryKey = ['instansi.manajemen-prodi.table.ubah', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahProdiFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      // const { data } = await processApi(lihatProdiApi, id)

      return {
        prodi: prodiOptions[1],
        nama: 'Sutandara',
        username: 'sutandara',
      }
    },
  })

  const onSubmit: SubmitHandler<UbahProdiFormSchema> = async (data) => {
    if (!id) return

    console.log(data)

    await wait(3000)

    // await handleActionWithToast(processApi(ubahProdiApi, id, data), {
    //   loading: 'Menyimpan...',
    //   onStart: () => setFormError(undefined),
    //   onSuccess: () => {
    //     queryClient.invalidateQueries({
    //       queryKey: ['instansi.prodi.table'],
    //     })
    //     queryClient.invalidateQueries({
    //       queryKey: ['instansi.prodi.table.ubah', id],
    //     })
    //     queryClient.invalidateQueries({
    //       queryKey: ['instansi.prodi.detail', id],
    //     })
    //     queryClient.setQueryData(
    //       queryKey,
    //       (oldData: UbahProdiFormSchema) => ({
    //         ...oldData,
    //         ...data,
    //       })
    //     )
    //     onHide()
    //   },
    //   onError: ({ message }) => setFormError(message),
    // })
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ubah Admin Prodi"
      isLoading={!isLoading && isFetching}
      color="warning"
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      {isLoading ? (
        <Loader height={336} />
      ) : (
        <Form<UbahProdiFormSchema>
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
                <ControlledSelect
                  name="prodi"
                  control={control}
                  options={prodiOptions}
                  label="Program Studi"
                  placeholder="Pilih Program Studi"
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
