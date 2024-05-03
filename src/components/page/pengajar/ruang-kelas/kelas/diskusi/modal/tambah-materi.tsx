import {
  Button,
  CardSeparator,
  ControlledDatePicker,
  ControlledQuillEditor,
  ControlledRadioGroup,
  Modal,
} from '@/components/ui'
import ControlledInput from '@/components/ui/controlled/input'
import { ControlledRadioGroupOptions } from '@/components/ui/controlled/radio-group'
import { Form } from '@/components/ui/form'
import ModalFooterButtons from '@/components/ui/modal/footer-buttons'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'
import { BsInfoCircle } from 'react-icons/bs'
import { Switch } from 'rizzui'

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

const optionsPresensi: ControlledRadioGroupOptions = [
  { label: 'Aktif', value: 'aktif' },
  { label: 'Tidak Aktif', value: 'non-aktif' },
]

const optionsTipePresensi: ControlledRadioGroupOptions = [
  { label: 'Absensi Manual', value: 'manual' },
  { label: 'Absensi Otomatis', value: 'otomatis' },
]

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

              <ControlledRadioGroup
                name="presensi"
                control={control}
                label={
                  <div className="flex items-center">
                    Presensi
                    <BsInfoCircle size={12} className="ml-1" />
                  </div>
                }
                className="flex gap-8 my-2"
                groupClassName="gap-8"
                labelClassName="mb-0"
                options={optionsPresensi}
              />

              {watch('presensi') === 'aktif' && (
                <ControlledRadioGroup
                  name="tipe_presensi"
                  control={control}
                  label={
                    <div className="flex items-center">
                      Atur Presensi
                      <BsInfoCircle size={12} className="ml-1" />
                    </div>
                  }
                  className="flex gap-8 my-2"
                  groupClassName="gap-8"
                  labelClassName="mb-0"
                  options={optionsTipePresensi}
                />
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
