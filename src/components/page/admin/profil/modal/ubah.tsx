import {
  CardSeparator,
  ControlledInput,
  Form,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nama: z.string().pipe(required),
  email: z.string().email().optional().or(z.literal('')),
  nomor: z.string().optional(),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  nama?: string
  email?: string
  nomor?: string
}

type UbahModalProps = {
  showModal: boolean
  setShowModal(show: boolean): void
}

export default function UbahModal({ showModal, setShowModal }: UbahModalProps) {
  const [initialValues, setInitialValues] = useState<FormSchema>()

  useEffect(() => {
    setInitialValues({
      nama: 'Nama Asli',
      email: 'admin@gmail.com',
      nomor: '08676876',
    })
  }, [showModal])

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <Modal
      title="Ubah Data Profil"
      color="warning"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
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
                name="nama"
                control={control}
                errors={errors}
                label="Nama Lengkap"
                placeholder="Nama Lengkap"
              />

              <ControlledInput
                name="email"
                control={control}
                errors={errors}
                type="email"
                label="Email"
                placeholder="Alamat Email"
              />

              <ControlledInput
                name="nomor"
                control={control}
                errors={errors}
                type="number"
                label="Nomor Kontak"
                placeholder="08xxxxxxx"
                phoneNumber
              />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Simpan"
              submitColor="warning"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
