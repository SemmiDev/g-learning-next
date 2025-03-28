import { shareSoalUjianAction } from '@/actions/pengguna/bank-soal/share-soal'
import {
  ControlledDatePicker,
  ControlledInput,
  ControlledKelas,
  ControlledQuillEditor,
  ControlledRadioGroup,
  ControlledSelect,
  Form,
  FormError,
  KelasItemType,
  Modal,
  ModalFooterButtons,
  RadioGroupOptionType,
  SelectOptionType,
  Switch,
  Text,
  Time,
} from '@/components/ui'
import { useAutoSizeExtraLargeModal } from '@/hooks/auto-size-modal/use-extra-large-modal'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { selectOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsCardChecklist, BsInfoCircle } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { SoalType } from '../soal-card'

const baseFormSchema = z.object({
  kelas: z.any().superRefine(objectRequired),
  judul: z.string().pipe(required),
  jenis: z.any().superRefine(objectRequired),
  durasi: z
    .string()
    .pipe(required)
    .transform((val) => parseInt(val))
    .pipe(z.number().min(1)),
  mulai: z.date(),
  selesai: z.date(),
  catatan: z.string().optional(),
  acakSoal: z.string(),
  acakJawaban: z.string(),
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

export type ShareSoalUjianFormSchema = {
  kelas?: KelasItemType
  judul?: string
  jenis?: SelectOptionType
  penjadwalan: boolean
  jadwal?: Date
  durasi?: string | number
  mulai?: Date
  selesai?: Date
  catatan?: string
  acakSoal: string
  acakJawaban: string
  presensi: string
}

const jenisOptions: SelectOptionType[] = [
  selectOption('Tugas'),
  selectOption('UTS'),
  selectOption('UAS'),
]

const acakOptions: RadioGroupOptionType[] = [
  { label: 'Aktif', value: 'aktif' },
  { label: 'Tidak Aktif', value: 'non-aktif' },
]

const presensiOptions: RadioGroupOptionType[] = [
  { label: 'Aktif', value: 'aktif' },
  { label: 'Tidak Aktif', value: 'non-aktif' },
]

type ShareSoalUjianModalProps = {
  soal: SoalType | undefined
  show: boolean
  onHide: () => void
}

export default function ShareSoalUjianModal({
  soal,
  show,
  onHide,
}: ShareSoalUjianModalProps) {
  const size = useAutoSizeExtraLargeModal()
  const [formError, setFormError] = useState<string>()

  const initialValues: ShareSoalUjianFormSchema = {
    penjadwalan: false,
    judul: soal?.title,
    catatan: soal?.desc,
    acakSoal: 'aktif',
    acakJawaban: 'non-aktif',
    presensi: 'aktif',
  }

  const onSubmit: SubmitHandler<ShareSoalUjianFormSchema> = async (data) => {
    const idKelas = data.kelas?.id
    if (!idKelas || !soal) return

    await handleActionWithToast(shareSoalUjianAction(idKelas, soal, data), {
      loading: 'Membagikan ujian...',
      onStart: () => setFormError(undefined),
      onSuccess: () => onHide(),
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Bagikan soal ujian ke kelas"
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<ShareSoalUjianFormSchema>
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
              {soal && (
                <div className="flex gap-x-2 border border-dashed border-muted rounded-md p-2">
                  <div
                    className={cn(
                      'flex size-11 items-center justify-center rounded-md btn-item-blue'
                    )}
                  >
                    <BsCardChecklist size={22} />
                  </div>
                  <div className="flex flex-col">
                    <Text
                      weight="semibold"
                      variant="dark"
                      title={soal.title}
                      className="truncate"
                    >
                      {soal.title}
                    </Text>
                    <ul className="flex flex-wrap items-center gap-x-1 text-sm text-gray-lighter">
                      <li>
                        <Time date={soal.time} />
                      </li>
                      <li>
                        <GoDotFill size={10} />
                      </li>
                      <li
                        title={
                          soal.totalPilihan < soal.pilihanDigunakan
                            ? `Total soal (${soal.totalPilihan}) masih kurang dari jumlah soal digunakan (${soal.pilihanDigunakan})`
                            : ''
                        }
                      >
                        {soal.pilihanDigunakan}/
                        <span
                          className={cn({
                            'text-danger':
                              soal.totalPilihan < soal.pilihanDigunakan,
                          })}
                        >
                          {soal.totalPilihan}
                        </span>{' '}
                        pilgan
                      </li>
                      <li>
                        <GoDotFill size={10} />
                      </li>
                      <li>{soal.totalEsai} esai</li>
                    </ul>
                  </div>
                </div>
              )}

              <ControlledKelas
                name="kelas"
                control={control}
                errors={errors}
                label="Pilih Kelas"
                type="Pengajar"
                required
              />

              <ControlledInput
                name="judul"
                control={control}
                errors={errors}
                label="Judul Ujian"
                placeholder="Tulis judul ujian di sini"
                required
              />

              <ControlledSelect
                name="jenis"
                control={control}
                options={jenisOptions}
                errors={errors}
                label="Jenis Ujian"
                placeholder="Tulis jenis ujian di sini"
                required
              />

              <div className="flex flex-wrap gap-x-4">
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
                    className="flex-1 min-w-[260px]"
                    required
                  />
                )}
              </div>

              <div className="flex flex-wrap gap-x-2 gap-y-4">
                <ControlledInput
                  name="durasi"
                  control={control}
                  errors={errors}
                  label="Durasi Ujian"
                  type="number"
                  placeholder="Atur lama ujian"
                  className="w-full md:w-44"
                  suffix={<small>Menit</small>}
                  required
                />
                <div className="grid grid-cols-2 gap-x-2 gap-y-4 flex-1">
                  <ControlledDatePicker
                    name="mulai"
                    control={control}
                    errors={errors}
                    label="Waktu Mulai"
                    placeholder="Atur waktu mulai"
                    showTimeSelect
                    dateFormat="dd MMMM yyyy HH:mm"
                    timeFormat="HH:mm"
                    className="col-span-2 sm:col-span-1"
                    required
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
                    className="col-span-2 sm:col-span-1"
                    required
                  />
                </div>
              </div>

              <ControlledQuillEditor
                name="catatan"
                control={control}
                errors={errors}
                label="Catatan Tambahan"
                placeholder="Buat catatan singkat terkait paket ujian yang diberikan"
                toolbar="minimalist"
              />

              <ControlledRadioGroup
                name="acakSoal"
                control={control}
                options={acakOptions}
                errors={errors}
                label={
                  <div className="flex items-center">
                    Acak Soal
                    <BsInfoCircle size={12} className="ml-1" />
                  </div>
                }
                className="mb-1.5"
                groupClassName="gap-8"
              />

              <ControlledRadioGroup
                name="acakJawaban"
                control={control}
                options={acakOptions}
                errors={errors}
                label={
                  <div className="flex items-center">
                    Acak Jawaban
                    <BsInfoCircle size={12} className="ml-1" />
                  </div>
                }
                className="mb-1.5"
                groupClassName="gap-8"
              />

              <ControlledRadioGroup
                name="presensi"
                control={control}
                options={presensiOptions}
                errors={errors}
                label={
                  <div className="flex items-center">
                    Presensi
                    <BsInfoCircle size={12} className="ml-1" />
                  </div>
                }
                className="mb-1.5"
                groupClassName="gap-8"
              />
            </div>

            <div className="px-3">
              <FormError error={formError} />
            </div>

            <ModalFooterButtons
              submit="Bagikan Sekarang"
              isSubmitting={isSubmitting}
              onCancel={handleClose}
              borderTop
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
