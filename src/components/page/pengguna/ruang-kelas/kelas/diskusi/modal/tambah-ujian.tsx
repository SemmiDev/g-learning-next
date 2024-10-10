import { tambahAktifitasUjianAction } from '@/actions/pengguna/ruang-kelas/aktifitas/tambah-ujian'
import {
  CardSeparator,
  ControlledDatePicker,
  ControlledInput,
  ControlledInputNumber,
  ControlledPaketSoal,
  ControlledQuillEditor,
  ControlledRadioGroup,
  ControlledSelect,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  PaketSoalItemType,
  RadioGroupOptionType,
  SelectOptionType,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { selectOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsInfoCircle } from 'react-icons/bs'
import { Switch } from 'rizzui'

const baseFormSchema = z.object({
  paket: z.any().superRefine(objectRequired),
  judul: z.string().pipe(required),
  jenis: z.any().superRefine(objectRequired),
  durasi: z.number(),
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

export type TambahUjianFormSchema = {
  paket?: PaketSoalItemType
  judul?: string
  jenis?: SelectOptionType
  penjadwalan: boolean
  jadwal?: Date
  durasi?: number
  mulai?: Date
  selesai?: Date
  catatan?: string
  acakSoal: string
  acakJawaban: string
  presensi: string
}

const initialValues: TambahUjianFormSchema = {
  penjadwalan: false,
  acakSoal: 'aktif',
  acakJawaban: 'non-aktif',
  presensi: 'aktif',
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

type TambahUjianModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function TambahUjianModal({
  show = false,
  setShow,
}: TambahUjianModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const onSubmit: SubmitHandler<TambahUjianFormSchema> = async (data) => {
    await handleActionWithToast(tambahAktifitasUjianAction(idKelas, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShow(false)
        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.diskusi.list', idKelas],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Bagikan Ujian"
      size="lg"
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahUjianFormSchema>
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
          setValue,
          formState: { errors, isSubmitting },
        }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledPaketSoal
                name="paket"
                control={control}
                errors={errors}
                label="Pilih Paket Soal"
                placeholder="Klik di sini untuk memilih paket soal yang ada"
                onChange={(val) => {
                  if (!val) return

                  setValue('judul', val.name)
                  setValue('catatan', val.desc)
                }}
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
                    required
                  />
                )}
              </div>

              <div className="flex gap-x-2">
                <ControlledInputNumber
                  name="durasi"
                  control={control}
                  errors={errors}
                  label="Durasi Ujian"
                  placeholder="Atur lama ujian"
                  className="w-36"
                  suffix={<small>Menit</small>}
                  required
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
                  className="flex-1"
                  required
                />
              </div>

              <ControlledQuillEditor
                name="catatan"
                control={control}
                errors={errors}
                label="Catatan Tambahan"
                placeholder="Buat catatan singkat terkait materi yang diberikan"
                toolbar="minimalist"
              />

              <ControlledRadioGroup
                name="acakSoal"
                control={control}
                label={
                  <div className="flex items-center">
                    Acak Soal
                    <BsInfoCircle size={12} className="ml-1" />
                  </div>
                }
                className="mb-1.5"
                groupClassName="gap-8"
                options={acakOptions}
              />

              <ControlledRadioGroup
                name="acakJawaban"
                control={control}
                label={
                  <div className="flex items-center">
                    Acak Jawaban
                    <BsInfoCircle size={12} className="ml-1" />
                  </div>
                }
                className="mb-1.5"
                groupClassName="gap-8"
                options={acakOptions}
              />

              <ControlledRadioGroup
                name="presensi"
                control={control}
                label={
                  <div className="flex items-center">
                    Presensi
                    <BsInfoCircle size={12} className="ml-1" />
                  </div>
                }
                className="mb-1.5"
                groupClassName="gap-8"
                options={presensiOptions}
              />
            </div>

            <div className="px-3">
              <FormError error={formError} />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Bagikan Sekarang"
              isSubmitting={isSubmitting}
              onCancel={handleClose}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
