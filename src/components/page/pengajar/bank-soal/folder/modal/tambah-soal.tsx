import { CardSeparator, ControlledQuillEditor, Modal } from '@/components/ui'
import ControlledInput from '@/components/ui/controlled/input'
import { Form } from '@/components/ui/form'
import ModalFooterButtons from '@/components/ui/modal/footer-buttons'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  judul: z.string().pipe(required),
  gunakan: z.string().pipe(required).pipe(z.coerce.number().min(1)),
  bobotBenar: z.string().pipe(required).pipe(z.coerce.number()),
  bobotSalah: z.string().pipe(required).pipe(z.coerce.number()),
  bobotKosong: z.string().pipe(required).pipe(z.coerce.number()),
  deskripsi: z.string().optional(),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  judul?: string
  gunakan?: string | number
  bobotBenar?: string | number
  bobotSalah?: string | number
  bobotKosong?: string | number
  deskripsi?: string
}

const initialValues: FormSchema = {
  bobotBenar: '1',
  bobotSalah: '0',
  bobotKosong: '0',
}

export default function TambahSoalModal({
  showModal = false,
  setShowModal,
}: {
  showModal?: boolean
  setShowModal(show: boolean): void
}) {
  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log('form data', data)
  }

  return (
    <Modal
      title="Buat Bank Soal Baru"
      size="lg"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Form<FormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{ mode: 'onSubmit', defaultValues: initialValues }}
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledInput
                name="judul"
                control={control}
                errors={errors}
                label="Judul Soal"
                placeholder="Tulis judul soal di sini"
              />

              <ControlledInput
                name="gunakan"
                control={control}
                errors={errors}
                type="number"
                label="Jumlah Soal Digunakan"
                placeholder="Jumlah soal yang akan digunakan dari keseluruhan soal"
                suffix="Soal"
              />

              <div className="flex gap-2">
                <ControlledInput
                  name="bobotBenar"
                  control={control}
                  errors={errors}
                  type="number"
                  label="Bobot Benar"
                  placeholder="Nilai jawaban benar"
                  className="flex-1"
                />
                <ControlledInput
                  name="bobotSalah"
                  control={control}
                  errors={errors}
                  type="number"
                  label="Bobot Salah"
                  placeholder="Nilai jawaban salah"
                  className="flex-1"
                />
                <ControlledInput
                  name="bobotKosong"
                  control={control}
                  errors={errors}
                  type="number"
                  label="Bobot Kosong"
                  placeholder="Nilai jawaban kosong"
                  className="flex-1"
                />
              </div>

              <ControlledQuillEditor
                name="deskripsi"
                control={control}
                errors={errors}
                label="Deskripsi"
                placeholder="Buat deskripsi singkat terkait soal"
                toolbar="minimalist"
              />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Mulai Buat Soal"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
