import {
  CardSeparator,
  ControlledDatePicker,
  ControlledQuillEditor,
  Modal,
  TextLabel,
} from '@/components/ui'
import ControlledInput from '@/components/ui/controlled/input'
import { Form } from '@/components/ui/form'
import ModalFooterButtons from '@/components/ui/modal/footer-buttons'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'
import { BsInfoCircle } from 'react-icons/bs'
import { Radio, Switch } from 'rizzui'

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
                label="Judul Conference"
                placeholder="Tulis judul conference di sini"
              />

              <ControlledQuillEditor
                name="catatan"
                control={control}
                errors={errors}
                label="Catatan Tambahan"
                placeholder="Buat catatan singkat terkait conference yang diberikan"
                toolbar="minimalist"
              />

              <ControlledInput
                name="link"
                control={control}
                errors={errors}
                label="Link Conference"
                placeholder="Tulis link conference di sini"
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
