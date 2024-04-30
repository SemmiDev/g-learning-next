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
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
  presensi: z.string(),
  tipe_presensi: z.string(),
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
  presensi: string
  tipe_presensi: string
  penjadwalan: boolean
  jadwal?: Date
}

const initialValues: FormSchema = {
  presensi: 'non-aktif',
  tipe_presensi: 'manual',
  penjadwalan: false,
}

export default function TambahMateriModal({
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
      title="Bagikan Materi"
      desc="Lampirkan materi yang ingin Kamu bagikan, dapat berupa gambar, video, link video, atau dokumen"
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
                label="Judul Materi"
                placeholder="Tulis judul materi di sini"
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
                <label className="text-gray-dark font-semibold mb-1.5 block">
                  Tambahkan Berkas
                </label>
                <div className="text-gray-lighter text-sm border-2 border-gray-50 rounded-md py-3 px-4">
                  <Button variant="text" className="h-4 p-0">
                    Klik di sini untuk tambah berkas
                  </Button>
                </div>
              </div>

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

              {watch('presensi') === 'aktif' && (
                <div className="flex mt-2 mb-2">
                  <div className="flex items-center space-x-1">
                    <TextLabel>Atur Presensi</TextLabel>
                    <BsInfoCircle size={12} />
                  </div>
                  <div className="flex flex-wrap gap-x-8 gap-y-2 ml-8">
                    <Radio
                      label="Absensi Manual"
                      className="[&_.rizzui-radio-field]:cursor-pointer"
                      value="manual"
                      {...register('tipe_presensi')}
                    />
                    <Radio
                      label="Absensi Otomatis"
                      className="[&_.rizzui-radio-field]:cursor-pointer"
                      value="otomatis"
                      {...register('tipe_presensi')}
                    />
                  </div>
                </div>
              )}
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
