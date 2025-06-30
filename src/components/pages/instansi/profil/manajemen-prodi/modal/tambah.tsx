import {
  ControlledInput,
  ControlledPassword,
  ControlledSelect,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { required, requiredPassword } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { wait } from '@/utils/wait'
import { z } from '@/utils/zod-id'
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

export type TambahProdiFormSchema = {
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

const initialValues: TambahProdiFormSchema = {}

type TambahModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function TambahModal({
  show = false,
  setShow,
}: TambahModalProps) {
  // const { processApi } = useSessionJwt()
  // const queryClient = useQueryClient()
  const size = useAutoSizeMediumModal()
  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<TambahProdiFormSchema> = async (data) => {
    console.log(data)

    await wait(3000)

    // await handleActionWithToast(processApi(tambahProdiApi, data), {
    //   loading: 'Menyimpan...',
    //   onStart: () => setFormError(undefined),
    //   onSuccess: () => {
    //     setShow(false)
    //     queryClient.invalidateQueries({
    //       queryKey: ['instansi.prodi.table'],
    //     })
    //   },
    //   onError: ({ message }) => setFormError(message),
    // })
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
      <Form<TambahProdiFormSchema>
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
