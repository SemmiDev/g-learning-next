import {
  CardSeparator,
  ControlledInput,
  ControlledQuillEditor,
  ControlledRadioGroup,
  Form,
  Modal,
  ModalFooterButtons,
  RadioGroupOptionType,
} from '@/components/ui'
import { radioGroupOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nama: z.string().pipe(required),
  nik: z.string().pipe(required),
  kontak: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  jenisKelamin: z.string().pipe(required),
  bio: z.string().optional(),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  nama?: string
  nik?: string
  kontak?: string
  website?: string
  jenisKelamin?: string
  bio?: string
}

const jenisKelaminOptions: RadioGroupOptionType[] = [
  radioGroupOption('Laki-laki'),
  radioGroupOption('Perempuan'),
]

type UbahModalProps = {
  showModal: boolean
  setShowModal(show: boolean): void
}

export default function UbahModal({ showModal, setShowModal }: UbahModalProps) {
  const [initialValues, setInitialValues] = useState<FormSchema>()

  useEffect(() => {
    setInitialValues({
      nama: 'Annitsa Bestweden',
      nik: '147122089920001',
      kontak: '081234567890',
      website: 'http://anbes.com',
      jenisKelamin: 'Perempuan',
      bio: '',
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
                name="nik"
                control={control}
                errors={errors}
                label="NIK"
                placeholder="Nomor Induk Kependudukan"
              />

              <ControlledInput
                name="kontak"
                control={control}
                errors={errors}
                type="number"
                label="Nomor Kontak"
                placeholder="08xxxxxxx"
                phoneNumber
              />

              <ControlledInput
                name="website"
                control={control}
                errors={errors}
                type="url"
                label="Website"
                placeholder="Website"
              />

              <ControlledRadioGroup
                name="jenisKelamin"
                control={control}
                options={jenisKelaminOptions}
                label="Jenis Kelamin"
                errors={errors}
              />

              <ControlledQuillEditor
                name="bio"
                control={control}
                toolbar="minimalist"
                label="Bio"
                placeholder="Biodata Diri"
                errors={errors}
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
