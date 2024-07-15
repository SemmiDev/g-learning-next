import {
  CardSeparator,
  ControlledInput,
  ControlledInputRupiah,
  ControlledSelect,
  Form,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
} from '@/components/ui'
import { selectOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { rupiahToNumber } from '@/utils/validations/transform'
import { z } from '@/utils/zod-id'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nama: z.string().pipe(required),
  totalPenyimpanan: z.string().pipe(required).pipe(z.coerce.number()),
  totalPenyimpananMetric: z.any().superRefine(objectRequired),
  penyimpananPengajar: z.string().pipe(required).pipe(z.coerce.number()),
  penyimpananPengajarMetric: z.any().superRefine(objectRequired),
  penyimpananPeserta: z.string().pipe(required).pipe(z.coerce.number()),
  penyimpananPesertaMetric: z.any().superRefine(objectRequired),
  limitUser: z.string().pipe(required).pipe(z.coerce.number()),
  limitKelas: z.string().pipe(required).pipe(z.coerce.number()),
  limitKelasPengajar: z.string().pipe(required).pipe(z.coerce.number()),
  harga: z
    .string()
    .pipe(required)
    .transform(rupiahToNumber)
    .pipe(z.coerce.number()),
})

// type FormSchema = z.infer<typeof formSchema>
type FormSchema = {
  nama?: string
  totalPenyimpanan?: number | string
  totalPenyimpananMetric?: SelectOptionType
  penyimpananPengajar?: number | string
  penyimpananPengajarMetric?: SelectOptionType
  penyimpananPeserta?: number | string
  penyimpananPesertaMetric?: SelectOptionType
  limitUser?: number | string
  limitKelas?: number | string
  limitKelasPengajar?: number | string
  harga?: number | string
}

const sizeMetricOptions: SelectOptionType[] = [
  selectOption('MB'),
  selectOption('GB'),
  selectOption('TB'),
]

const initialValues: FormSchema = {
  harga: '20000',
}

export default function TambahModal({
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
      title="Tambah Paket Instansi"
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
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledInput
                name="nama"
                control={control}
                errors={errors}
                label="Nama Paket"
                placeholder="Nama Paket"
              />

              <div className="flex">
                <ControlledInput
                  name="totalPenyimpanan"
                  control={control}
                  errors={errors}
                  type="number"
                  min={0}
                  label="Total Penyimpanan"
                  placeholder="Total Penyimpanan"
                  className="flex-1"
                  inputClassName="rounded-r-none"
                />

                <ControlledSelect
                  name="totalPenyimpananMetric"
                  control={control}
                  options={sizeMetricOptions}
                  placeholder="Metric"
                  defaultValue={sizeMetricOptions[0]}
                  className="w-24 mt-[26px]"
                  classNames={{ control: 'rounded-l-none' }}
                />
              </div>

              <div className="flex">
                <ControlledInput
                  name="penyimpananPengajar"
                  control={control}
                  errors={errors}
                  type="number"
                  min={0}
                  label="Limit Penyimpanan Pengajar"
                  placeholder="Limit Penyimpanan Pengajar"
                  className="flex-1"
                  inputClassName="rounded-r-none"
                />
                <ControlledSelect
                  name="penyimpananPengajarMetric"
                  control={control}
                  options={sizeMetricOptions}
                  placeholder="Metric"
                  defaultValue={sizeMetricOptions[0]}
                  className="w-24 mt-[26px]"
                  classNames={{ control: 'rounded-l-none' }}
                />
              </div>

              <div className="flex">
                <ControlledInput
                  name="penyimpananPeserta"
                  control={control}
                  errors={errors}
                  type="number"
                  min={0}
                  label="Limit Penyimpanan Peserta"
                  placeholder="Limit Penyimpanan Peserta"
                  className="flex-1"
                  inputClassName="rounded-r-none"
                />
                <ControlledSelect
                  name="penyimpananPesertaMetric"
                  control={control}
                  options={sizeMetricOptions}
                  placeholder="Metric"
                  defaultValue={sizeMetricOptions[0]}
                  className="w-24 mt-[26px]"
                  classNames={{ control: 'rounded-l-none' }}
                />
              </div>

              <ControlledInput
                name="limitUser"
                control={control}
                errors={errors}
                type="number"
                min={0}
                label="Limit User"
                placeholder="Jumlah maksimal user yang mendaftar"
                suffix="User"
              />

              <ControlledInput
                name="limitKelas"
                control={control}
                errors={errors}
                type="number"
                min={0}
                label="Limit Kelas"
                placeholder="Jumlah maksimal kelas yang bisa dibuka"
                suffix="Kelas"
              />

              <ControlledInput
                name="limitKelasPengajar"
                control={control}
                errors={errors}
                type="number"
                min={0}
                label="Limit Kelas/pengajar"
                placeholder="Jumlah default maksimal kelas yang bisa dibuka oleh pengajar"
                suffix="Kelas"
              />

              <ControlledInputRupiah
                name="harga"
                control={control}
                errors={errors}
                label="Harga/bulan"
                placeholder="Harga paket"
              />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Simpan"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
