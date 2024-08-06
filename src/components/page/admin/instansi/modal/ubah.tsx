import {
  CardSeparator,
  ControlledDatePicker,
  ControlledInput,
  ControlledPassword,
  ControlledSelect,
  Form,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nama: z.string().pipe(required),
  kontak: z.string().pipe(required),
  pimpinan: z.string().pipe(required),
  kontakPimpinan: z.string().pipe(required),
  jenis: z.any().superRefine(objectRequired),
  paket: z.any().superRefine(objectRequired),
  jatuhTempo: z.date(),
  usernameAdmin: z.string().pipe(required),
  passwordAdmin: z.string().pipe(required),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  nama?: string
  kontak?: string
  pimpinan?: string
  kontakPimpinan?: string
  jenis?: SelectOptionType
  paket?: SelectOptionType
  jatuhTempo?: Date
  usernameAdmin?: string
  passwordAdmin?: string
}

const jenisOptions: SelectOptionType[] = [
  { value: 'jenis1', label: 'Jenis 1', jargon: 'ok' },
  { value: 'jenis2', label: 'Jenis 2' },
]

const paketOptions: SelectOptionType[] = [
  { value: 'paket1', label: 'Paket 1' },
  { value: 'paket2', label: 'Paket 2' },
]

type UbahModalProps = {
  showModal?: number
  setShowModal(show?: number): void
}

export default function UbahModal({ showModal, setShowModal }: UbahModalProps) {
  const [initialValues, setInitialValues] = useState<FormSchema | undefined>()

  useEffect(() => {
    setInitialValues({
      nama: 'Instansi Saya',
      kontak: '08676876',
      pimpinan: 'Pimpinan Saya',
      kontakPimpinan: '08798789',
      jenis: { value: 'jenis2', label: 'Jenis 2' },
      paket: { value: 'paket1', label: 'Paket 1' },
      jatuhTempo: new Date(),
      usernameAdmin: 'admin',
      passwordAdmin: 'adminok123',
    })
  }, [showModal])

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <Modal
      title="Ubah Instansi"
      color="warning"
      isOpen={!!showModal}
      onClose={() => setShowModal(undefined)}
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
                label="Nama Instansi"
                placeholder="Nama Instansi"
              />

              <ControlledInput
                name="kontak"
                control={control}
                errors={errors}
                label="Nomor Kontak Instansi"
                placeholder="08xxxxxxx"
              />

              <ControlledInput
                name="pimpinan"
                control={control}
                errors={errors}
                label="Nama Pimpinan"
                placeholder="Nama Pimpinan"
              />

              <ControlledInput
                name="kontakPimpinan"
                control={control}
                errors={errors}
                label="Nomor Kontak Pimpinan"
                placeholder="08xxxxxxx"
              />

              <ControlledSelect
                name="jenis"
                control={control}
                options={jenisOptions}
                label="Jenis Instansi"
                placeholder="Pilih Jenis Instansi"
                errors={errors}
                isClearable
              />

              <ControlledSelect
                name="paket"
                control={control}
                options={paketOptions}
                label="Paket"
                placeholder="Pilih Paket"
                errors={errors}
                isClearable
              />

              <ControlledDatePicker
                name="jatuhTempo"
                control={control}
                errors={errors}
                label="Tanggal Jatuh Tempo"
                placeholder="Tanggal Jatuh Tempo"
              />

              <ControlledInput
                name="usernameAdmin"
                control={control}
                errors={errors}
                label="Username Admin Kampus"
                placeholder="Username Admin Kampus"
              />

              <ControlledPassword
                name="passwordAdmin"
                control={control}
                errors={errors}
                label="Kata Sandi Admin Kampus"
                placeholder="Kata Sandi untuk Admin Kampus"
              />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Simpan"
              submitColor="warning"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(undefined)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
