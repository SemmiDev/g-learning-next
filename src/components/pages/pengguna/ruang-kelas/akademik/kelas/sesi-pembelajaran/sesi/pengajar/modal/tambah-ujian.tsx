import {
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
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { tambahAktifitasUjianSesiApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/sesi/tambah-ujian'
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

const formSchema = z.object({
  paket: z.any().superRefine(objectRequired),
  judul: z.string().pipe(required),
  jenis: z.any().superRefine(objectRequired),
  durasi: z.number(),
  mulai: z.date(),
  selesai: z.date(),
  catatan: z.string().optional(),
  acakSoal: z.string(),
  acakJawaban: z.string(),
})

export type TambahUjianSesiFormSchema = {
  paket?: PaketSoalItemType
  judul?: string
  jenis?: SelectOptionType
  durasi?: number
  mulai?: Date
  selesai?: Date
  catatan?: string
  acakSoal: string
  acakJawaban: string
}

const initialValues: TambahUjianSesiFormSchema = {
  acakSoal: 'aktif',
  acakJawaban: 'non-aktif',
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

type TambahUjianSesiModalProps = {
  idSesi: string | undefined
  show?: boolean
  onHide: () => void
}

export default function TambahUjianSesiModal({
  idSesi,
  show = false,
  onHide,
}: TambahUjianSesiModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()

  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const onSubmit: SubmitHandler<TambahUjianSesiFormSchema> = async (data) => {
    if (!idSesi) return

    await handleActionWithToast(
      processApi(tambahAktifitasUjianSesiApi, idKelas, idSesi, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              'pengguna.ruang-kelas.sesi-pembelajaran.bahan-ajar.list',
              idKelas,
              idSesi,
            ],
          })
          queryClient.invalidateQueries({
            queryKey: [
              'pengguna.ruang-kelas.sesi-pembelajaran.list',
              'pengajar',
              idKelas,
            ],
          })
          queryClient.invalidateQueries({
            queryKey: ['pengguna.ruang-kelas.linimasa.list-jadwal-kelas'],
          })
          queryClient.invalidateQueries({
            queryKey: ['pengguna.ruang-kelas.linimasa.list', idKelas],
          })
          onHide()
        },
        onError: ({ message }) => setFormError(message),
      }
    )
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Bagikan Ujian"
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahUjianSesiFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
        flexing
      >
        {({ control, setValue, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col">
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

                <div className="grid grid-cols-12 gap-2">
                  <ControlledInputNumber
                    name="durasi"
                    control={control}
                    errors={errors}
                    label="Durasi Ujian"
                    placeholder="Atur lama ujian"
                    className="col-span-12 xs:col-span-4"
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
                    className="col-span-12 xs:col-span-4"
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
                    className="col-span-12 xs:col-span-4"
                    required
                  />
                </div>

                <ControlledQuillEditor
                  name="catatan"
                  control={control}
                  errors={errors}
                  label="Catatan Tambahan"
                  placeholder="Buat catatan singkat terkait ujian yang diberikan"
                  toolbar="minimalist"
                />

                <ControlledRadioGroup
                  name="acakSoal"
                  control={control}
                  options={acakOptions}
                  errors={errors}
                  label="Acak Soal Pilihan Ganda"
                  className="mb-1.5"
                  groupClassName="gap-8"
                />

                <ControlledRadioGroup
                  name="acakJawaban"
                  control={control}
                  options={acakOptions}
                  errors={errors}
                  label="Acak Jawaban"
                  className="mb-1.5"
                  groupClassName="gap-8"
                />
              </div>

              <div className="px-3">
                <FormError error={formError} />
              </div>
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
