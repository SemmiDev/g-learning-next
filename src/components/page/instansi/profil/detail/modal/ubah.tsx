import {
  CardSeparator,
  ControlledInput,
  ControlledQuillEditor,
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
  pimpinan: z.string().pipe(required),
  kontakPimpinan: z.string().optional(),
  alamat: z.string().optional(),
  kontak: z.string().optional(),
  bio: z.string().optional(),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  nama: string
  pimpinan: string
  kontakPimpinan?: string
  alamat?: string
  kontak?: string
  bio?: string
}

type UbahModalProps = {
  showModal: boolean
  setShowModal(show: boolean): void
}

export default function UbahModal({ showModal, setShowModal }: UbahModalProps) {
  const [initialValues, setInitialValues] = useState<FormSchema | null>()

  useEffect(() => {
    setInitialValues({
      nama: 'UIN SUSKA Riau',
      pimpinan: 'Prof. Dr. H. Khairunnas Raja, M.Ag',
      kontakPimpinan: '081234567890',
      alamat:
        'Panam, Jl. HR. Soebrantas No.Km. 15, RW.15, Simpang Baru, Kota Pekanbaru, Riau 28293',
      kontak: '080987654321',
      bio: 'Universitas Islam Negeri Sultan Syarif Kasim Riau (UIN Suska Riau) adalah perguruan tinggi negeri berbasis Islam yang berlokasi di Pekanbaru, Riau. UIN Suska Riau mengintegrasikan ilmu pengetahuan umum dengan nilai-nilai Islam, memberikan kontribusi dalam pendidikan, penelitian, dan pengabdian masyarakat. Universitas ini menawarkan program studi dari tingkat sarjana hingga pascasarjana di berbagai disiplin ilmu, termasuk ilmu sosial, sains, teknologi, dan agama Islam. UIN Suska Riau berkomitmen mencetak lulusan yang kompeten, berakhlak mulia, dan siap berkontribusi dalam pembangunan masyarakat.',
    })
  }, [showModal])

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <Modal
      title="Ubah Data Instansi"
      color="warning"
      size="lg"
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
                label="Nama Instansi"
                placeholder="Nama Instansi"
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
                type="number"
                label="Nomor Kontak Pimpinan"
                placeholder="08xxxxxxx"
                phoneNumber
              />

              <ControlledInput
                name="alamat"
                control={control}
                errors={errors}
                label="Alamat Instansi"
                placeholder="Alamat Lengkap Instansi"
              />

              <ControlledInput
                name="kontak"
                control={control}
                errors={errors}
                type="number"
                label="Nomor Kontak Admin/Instansi"
                placeholder="08xxxxxxx"
                phoneNumber
              />

              <ControlledQuillEditor
                name="bio"
                control={control}
                errors={errors}
                label="Bio"
                placeholder="Biodata Instansi"
                toolbar="minimalist"
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
