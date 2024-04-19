import { Button, CardSeparator, Modal, Text, TextLabel } from '@/components/ui'
import { Form } from '@/components/ui/form'
import QuillEditor from '@/components/ui/quill-editor'
import { Controller, SubmitHandler } from 'react-hook-form'
import { z } from '@/utils/zod-id'
import { Input, Radio, Switch } from 'rizzui'
import { required } from '@/utils/validations/pipe'
import { BsInfoCircle } from 'react-icons/bs'
import { DatePicker } from '@/components/ui/datepicker'
import { dateRequired } from '@/utils/validations/refine'

const formSchema = z.object({
  jenis: z.string().pipe(required),
  jadwal: z.coerce.date().optional(),
  penjadwalan: z.coerce.boolean(),
  durasi: z.optional(z.coerce.number()),
  mulai: z.optional(z.coerce.date()),
  selesai: z.optional(z.coerce.date()),
  paket: z.string().optional(),
  catatan: z.string(),
  acak: z.string(),
  presensi: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

const initialValues: FormSchema = {
  jenis: '',
  penjadwalan: false,
  paket: '',
  catatan: '',
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
                label="Jenis Ujian"
                placeholder="Tulis jenis ujian di sini"
                labelClassName="text-gray-dark font-semibold"
                {...register('jenis')}
                error={errors.jenis?.message as string}
              />

              <div className="flex gap-x-4">
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

              <div className="flex gap-x-2">
                <Input
                  label="Durasi Ujian"
                  type="number"
                  placeholder="Atur lama ujian"
                  className="flex-1"
                  labelClassName="text-gray-dark font-semibold"
                  suffix="Menit"
                  {...register('durasi')}
                  error={errors.durasi?.message as string}
                />
                <Controller
                  name="mulai"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <DatePicker
                      inputProps={{ label: 'Waktu Mulai' }}
                      placeholderText="Atur waktu mulai"
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
                <Controller
                  name="selesai"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <DatePicker
                      inputProps={{ label: 'Waktu Selesai' }}
                      placeholderText="Atur waktu selesai"
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
              </div>

              {/* Ganti menggunakan searchable select */}
              <Input
                label="Pilih Paket Soal"
                placeholder="Klik di sini untuk memilih paket soal yang ada"
                labelClassName="text-gray-dark font-semibold"
                {...register('paket')}
              />

              <Controller
                control={control}
                name="catatan"
                render={({ field: { onChange, value } }) => (
                  <QuillEditor
                    label="Catatan Tambahan"
                    placeholder="Buat catatan singkat terkait materi yang diberikan"
                    value={value}
                    onChange={onChange}
                  />
                )}
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
