import {
  CardSeparator,
  ControlledInput,
  ControlledPassword,
  Form,
  Modal,
  ModalFooterButtons,
  TextSpan,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z
  .object({
    nama: z.string().pipe(required),
    username: z.string().pipe(required),
    password: z.string().optional(),
    ulangiPassword: z.string().optional(),
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

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  nama?: string
  username?: string
  password?: string
  ulangiPassword?: string
}

type UbahModalProps = {
  showModal?: number | null
  setShowModal(show: number | null): void
}

export default function UbahModal({
  showModal = null,
  setShowModal,
}: UbahModalProps) {
  const [initialValues, setInitialValues] = useState<FormSchema | null>()

  useEffect(() => {
    setInitialValues({
      nama: 'Nama Asli',
      username: 'Admin',
    })
  }, [showModal])

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <Modal
      title="Ubah Admin"
      color="warning"
      isOpen={!!showModal}
      onClose={() => setShowModal(null)}
    >
      <Form<FormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues ?? {},
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
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Simpan"
              submitColor="warning"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(null)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
