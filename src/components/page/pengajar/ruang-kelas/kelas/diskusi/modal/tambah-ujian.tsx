import {
  Button,
  CardSeparator,
  ControlledDatePicker,
  ControlledQuillEditor,
  Modal,
  Text,
  TextLabel,
} from '@/components/ui'
import { Form } from '@/components/ui/form'
import { Controller, SubmitHandler } from 'react-hook-form'
import { z } from '@/utils/zod-id'
import { Radio, Switch } from 'rizzui'
import { required } from '@/utils/validations/pipe'
import { BsInfoCircle } from 'react-icons/bs'
import ControlledInput from '@/components/ui/controlled/input'
import ModalFooterButtons from '@/components/ui/modal/footer-buttons'

const baseFormSchema = z.object({
  jenis: z.string().pipe(required),
  durasi: z
    .string()
    .pipe(required)
    .transform((val) => parseInt(val))
    .pipe(z.number().min(1)),
  mulai: z.date(),
  selesai: z.date(),
  paket: z.string().optional(),
  catatan: z.string().optional(),
  acak: z.string(),
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
  jenis?: string
  penjadwalan: boolean
  jadwal?: Date
  durasi?: string | number
  mulai?: Date
  selesai?: Date
  paket?: string
  catatan?: string
  acak: string
  presensi: string
}

const initialValues: FormSchema = {
  penjadwalan: false,
  acak: 'aktif',
  presensi: 'aktif',
}

export default function TambahUjianModal({
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
      title="Bagikan Ujian"
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
                name="jenis"
                control={control}
                errors={errors}
                label="Jenis Ujian"
                placeholder="Tulis jenis ujian di sini"
              />

              <div className="flex gap-x-4">
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

              <div className="flex gap-x-2">
                <ControlledInput
                  name="durasi"
                  control={control}
                  errors={errors}
                  label="Durasi Ujian"
                  type="number"
                  placeholder="Atur lama ujian"
                  className="flex-1"
                  suffix="Menit"
                />
                <ControlledDatePicker
                  name="mulai"
                  control={control}
                  errors={errors}
                  label="Waktu Mulai"
                  placeholder="Atur waktu mulai"
                  showTimeSelect
                  dateFormat="dd MMMM yyyy HH:mm"
                  timeFormat="HH:mm"
                  className="flex-1"
                />
                <ControlledDatePicker
                  name="selesai"
                  control={control}
                  errors={errors}
                  label="Waktu Selesai"
                  placeholder="Atur waktu selesai"
                  showTimeSelect
                  dateFormat="dd MMMM yyyy HH:mm"
                  timeFormat="HH:mm"
                  className="flex-1"
                />
              </div>

              {/* Ganti menggunakan searchable select */}
              <ControlledInput
                name="paket"
                control={control}
                errors={errors}
                label="Pilih Paket Soal"
                placeholder="Klik di sini untuk memilih paket soal yang ada"
              />

              <ControlledQuillEditor
                name="catatan"
                control={control}
                errors={errors}
                label="Catatan Tambahan"
                placeholder="Buat catatan singkat terkait materi yang diberikan"
                toolbar="minimalist"
              />

              <div>
                <div className="flex items-center space-x-1 mb-1.5">
                  <TextLabel>Acak Soal</TextLabel>
                  <BsInfoCircle size={12} />
                </div>
                <div className="flex gap-x-8">
                  <Radio
                    label="Aktif"
                    className="[&_.rizzui-radio-field]:cursor-pointer"
                    value="aktif"
                    {...register('acak')}
                  />
                  <Radio
                    label="Tidak Aktif"
                    className="[&_.rizzui-radio-field]:cursor-pointer"
                    value="non-aktif"
                    {...register('acak')}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-1 mb-1.5">
                  <TextLabel>Presensi</TextLabel>
                  <BsInfoCircle size={12} />
                </div>
                <div className="flex gap-x-8">
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
