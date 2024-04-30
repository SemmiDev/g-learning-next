import {
  Button,
  CardSeparator,
  ControlledDatePicker,
  ControlledQuillEditor,
  Modal,
} from '@/components/ui'
import ControlledInput from '@/components/ui/controlled/input'
import { Form } from '@/components/ui/form'
import ModalFooterButtons from '@/components/ui/modal/footer-buttons'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'
import { Switch } from 'rizzui'

const baseFormSchema = z.object({
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
})

const formSchema = z.discriminatedUnion('dibawasiWaktu', [
  z
    .object({
      dibawasiWaktu: z.literal(false),
    })
    .merge(baseFormSchema),
  z
    .object({
      dibawasiWaktu: z.literal(true),
      batasWaktu: z.date(),
    })
    .merge(baseFormSchema),
])

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  judul?: string
  catatan?: string
  dibawasiWaktu: boolean
  batasWaktu?: Date
}

const initialValues: FormSchema = {
  dibawasiWaktu: false,
}

export default function TambahTugasModal({
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
      title="Bagikan Tugas"
      size="lg"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Form<FormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
      >
        {({
          register,
          control,
          watch,
          formState: { errors, isSubmitting },
        }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledInput
                name="judul"
                control={control}
                errors={errors}
                label="Judul Tugas"
                placeholder="Tulis judul tugas di sini"
              />

              <ControlledQuillEditor
                name="catatan"
                control={control}
                errors={errors}
                label="Catatan Tambahan"
                placeholder="Buat catatan singkat terkait tugas yang diberikan"
                toolbar="minimalist"
              />

              <div>
                <label className="text-gray-dark font-semibold mb-1.5 block">
                  Tambahkan Berkas
                </label>
                <div className="text-gray-lighter text-sm border-2 border-gray-50 rounded-md py-3 px-4">
                  <Button variant="text" className="h-4 p-0">
                    Klik di sini untuk tambah berkas
                  </Button>
                </div>
              </div>

              <div className="flex gap-x-4 px-3 py-3">
                <Switch
                  label="Opsi Batas Waktu Penyerahan"
                  labelClassName="text-gray-dark font-semibold"
                  {...register('dibawasiWaktu')}
                />
                {watch('dibawasiWaktu', false) && (
                  <ControlledDatePicker
                    name="batasWaktu"
                    control={control}
                    errors={errors}
                    placeholder="Atur Tanggal dan Jam Terbit"
                    showTimeSelect
                    dateFormat="dd MMMM yyyy HH:mm"
                    timeFormat="HH:mm"
                    className="flex-1"
                  />
                )}
              </div>
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Bagikan Sekarang"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
