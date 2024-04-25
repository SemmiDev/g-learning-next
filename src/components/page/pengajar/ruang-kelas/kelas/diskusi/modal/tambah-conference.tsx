import { Button, CardSeparator, Modal, TextLabel } from '@/components/ui'
import { Form } from '@/components/ui/form'
import QuillEditor from '@/components/ui/quill-editor'
import { Controller, SubmitHandler } from 'react-hook-form'
import { z } from '@/utils/zod-id'
import { Input, Radio, Switch } from 'rizzui'
import { required } from '@/utils/validations/pipe'
import { BsInfoCircle } from 'react-icons/bs'
import { DatePicker } from '@/components/ui/datepicker'

const baseFormSchema = z.object({
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
  link: z.string().pipe(required),
  presensi: z.string(),
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
  link?: string
  presensi: string
  penjadwalan: boolean
  jadwal?: Date
}

const initialValues: FormSchema = {
  presensi: 'non-aktif',
  penjadwalan: false,
}

export default function TambahConferenceModal({
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
      title="Bagikan Conference"
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
              <Input
                label="Judul Conference"
                placeholder="Tulis judul conference di sini"
                labelClassName="text-gray-dark font-semibold"
                {...register('judul')}
                error={errors.judul?.message}
              />

              <Controller
                control={control}
                name="catatan"
                render={({ field: { onChange, value } }) => (
                  <QuillEditor
                    label="Catatan Tambahan"
                    placeholder="Buat catatan singkat terkait conference yang diberikan"
                    toolbar="minimalist"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />

              <Input
                label="Link Conference"
                placeholder="Tulis link conference di sini"
                labelClassName="text-gray-dark font-semibold"
                {...register('link')}
                error={errors.link?.message}
              />

              <div className="flex gap-x-8 mt-2 mb-2">
                <div className="flex items-center space-x-1">
                  <TextLabel>Presensi</TextLabel>
                  <BsInfoCircle size={12} />
                </div>
                <Radio
                  label="Aktif"
                  className="[&_.rizzui-radio-field]:cursor-pointer"
                  value="aktif"
                  {...register('presensi')}
                />
                <Radio
                  label="Tidak Aktif"
                  className="[&_.rizzui-radio-field]:cursor-pointer"
                  value="non-aktif"
                  {...register('presensi')}
                />
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

            <div className="flex gap-2 p-3">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                Bagikan Sekarang
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowModal(false)}
              >
                Batal
              </Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  )
}
