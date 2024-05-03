import {
  Button,
  CardSeparator,
  ControlledDatePicker,
  ControlledInput,
  ControlledQuillEditor,
  Form,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'
import { Switch } from 'rizzui'

const baseFormSchema = z.object({
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
})

const formSchema = z.discriminatedUnion('penjadwalan', [
  z
    .object({
      penjadwalan: z.literal(false),
    })
    .merge(baseFormSchema),
  z
    .object({
      penjadwalan: z.literal(true),
      jadwal: z.date(),
    })
    .merge(baseFormSchema),
])

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  judul?: string
  catatan?: string
  penjadwalan: boolean
  jadwal?: Date
}

const initialValues: FormSchema = {
  penjadwalan: false,
}

export default function TambahInformasiModal({
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
      title="Bagikan Informasi"
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
                label="Judul Informasi"
                placeholder="Tulis judul informasi di sini"
              />

              <ControlledQuillEditor
                name="catatan"
                control={control}
                errors={errors}
                label="Catatan Tambahan"
                placeholder="Buat catatan terkait informasi yang diberikan"
                className="col-span-full [&_.ql-editor]:min-h-[150px]"
              />

              <div>
                <label className="text-gray-dark font-semibold mb-1.5 block">
                  Upload foto atau video
                </label>
                <div className="text-gray-lighter text-sm border-2 border-gray-50 rounded-md py-3 px-4">
                  <Button variant="text" className="h-4 p-0">
                    Klik di sini untuk memilih foto
                  </Button>
                </div>
              </div>
            </div>

            <CardSeparator />

            <div className="flex gap-x-4 px-3 py-3">
              <Switch
                label="Opsi Penjadwalan"
                labelClassName="text-gray-dark font-semibold"
                {...register('penjadwalan')}
              />
              {watch('penjadwalan', false) && (
                <ControlledDatePicker
                  name="jadwal"
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
