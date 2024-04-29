import { Button, CardSeparator, Modal, Text, TextLabel } from '@/components/ui'
import { Form } from '@/components/ui/form'
import QuillEditor from '@/components/ui/quill-editor'
import { Controller, SubmitHandler } from 'react-hook-form'
import { z } from '@/utils/zod-id'
import { Switch } from 'rizzui'
import { required } from '@/utils/validations/pipe'
import { DatePicker } from '@/components/ui/datepicker'
import ControlledInput from '@/components/ui/controlled/input'
import ModalFooterButtons from '@/components/ui/modal/footer-buttons'

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

              <Controller
                control={control}
                name="catatan"
                render={({ field: { onChange, value } }) => (
                  <QuillEditor
                    label="Catatan Tambahan"
                    placeholder="Buat catatan terkait informasi yang diberikan"
                    className="col-span-full [&_.ql-editor]:min-h-[150px]"
                    value={value}
                    onChange={onChange}
                  />
                )}
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
                <Controller
                  name="jadwal"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <DatePicker
                      inputProps={{ error: errors.jadwal?.message }}
                      placeholderText="Atur Tanggal dan Jam Terbit"
                      showTimeSelect
                      dateFormat="dd MMMM yyyy HH:mm"
                      timeFormat="HH:mm"
                      onChange={onChange}
                      onBlur={onBlur}
                      selected={value}
                      className="flex-1"
                    />
                  )}
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
