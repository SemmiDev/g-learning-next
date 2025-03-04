import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { ubahAktifitasUjianAction } from '@/actions/pengguna/ruang-kelas/aktifitas/umum/ubah-ujian'
import {
  CardSeparator,
  ControlledDatePicker,
  ControlledInput,
  ControlledInputNumber,
  ControlledQuillEditor,
  ControlledRadioGroup,
  ControlledSelect,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  PaketSoalItemType,
  RadioGroupOptionType,
  SelectOptionType,
  Text,
  Time,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { handleActionWithToast } from '@/utils/action'
import { parseDate } from '@/utils/date'
import { mustBe } from '@/utils/must-be'
import { selectOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsCardChecklist, BsInfoCircle } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { Switch, Tooltip } from 'rizzui'

const baseFormSchema = z.object({
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

export type UbahUjianFormSchema = {
  paket?: Omit<PaketSoalItemType, 'total'> & { idKategori: string }
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

type UbahUjianModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahUjianModal({
  id,
  show,
  onHide,
}: UbahUjianModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = ['pengguna.ruang-kelas.diskusi.ubah', idKelas, id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahUjianFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id)
        return {
          penjadwalan: false,
          acakSoal: 'aktif',
          acakJawaban: 'non-aktif',
          presensi: 'aktif',
        }

      const { data } = await lihatAktifitasAction(idKelas, id)
      const bankSoal = data?.bank_soal

      return {
        paket: bankSoal
          ? ({
              id: bankSoal.id,
              idKategori: bankSoal.id_kategori,
              name: bankSoal.judul,
              desc: bankSoal.deskripsi,
              time: bankSoal.created_at,
              pilihanDigunakan: bankSoal.jumlah_soal_yang_digunakan,
              totalPilihan: bankSoal.total_soal_pilihan_ganda,
              totalEsai: bankSoal.total_soal_essay,
            } as UbahUjianFormSchema['paket'])
          : undefined,
        judul: data?.aktifitas.judul,
        jenis: selectOption(
          mustBe(
            data?.aktifitas.kategori_nilai,
            ['Tugas', 'UTS', 'UAS'],
            'Tugas'
          )
        ),
        penjadwalan: !!data?.aktifitas.waktu_tersedia,
        jadwal: parseDate(data?.aktifitas.waktu_tersedia ?? undefined),
        durasi: data?.aktifitas.durasi_ujian ?? undefined,
        mulai: parseDate(data?.aktifitas.waktu_mulai_ujian ?? undefined),
        selesai: parseDate(data?.aktifitas.waktu_selesai_ujian ?? undefined),
        catatan: data?.aktifitas.deskripsi ?? undefined,
        acakSoal: data?.aktifitas.acak_soal === 1 ? 'aktif' : 'non-aktif',
        acakJawaban: data?.aktifitas.acak_jawaban === 1 ? 'aktif' : 'non-aktif',
        presensi: data?.aktifitas.absen === 'Otomatis' ? 'aktif' : 'non-aktif',
      }
    },
  })

  const onSubmit: SubmitHandler<UbahUjianFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahAktifitasUjianAction(idKelas, id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.diskusi.list', idKelas],
        })
        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.diskusi.ujian', idKelas, id],
        })
        queryClient.setQueryData(queryKey, (oldData: UbahUjianFormSchema) => ({
          ...oldData,
          ...data,
        }))
        onHide()
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const paket = initialValues?.paket

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ubah Ujian Dibagikan"
      isLoading={!isLoading && isFetching}
      color="warning"
      size="lg"
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      {isLoading ? (
        <Loader height={500} />
      ) : (
        <Form<UbahUjianFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
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
                {paket && (
                  <Tooltip
                    content="Lihat Paket Soal"
                    color="invert"
                    placement="right"
                  >
                    <Link
                      href={`${routes.pengguna.bankSoal}/${paket.idKategori}/soal/${paket.id}`}
                      target="_blank"
                    >
                      <div className="flex space-x-2 border border-dashed border-muted rounded-md p-2">
                        <div className="flex size-11 items-center justify-center rounded-md btn-item-blue">
                          <BsCardChecklist size={22} />
                        </div>
                        <div className="flex flex-col">
                          <Text
                            weight="semibold"
                            variant="dark"
                            title={paket.name}
                            className="truncate"
                          >
                            {paket.name}
                          </Text>
                          <ul className="flex flex-wrap items-center gap-x-1 text-sm text-gray-lighter">
                            <li>
                              <Time date={paket.time} />
                            </li>
                            <li>
                              <GoDotFill size={10} />
                            </li>
                            <li>
                              {paket.pilihanDigunakan}/{paket.totalPilihan}{' '}
                              pilgan
                            </li>
                            <li>
                              <GoDotFill size={10} />
                            </li>
                            <li>{paket.totalEsai} esai</li>
                          </ul>
                        </div>
                      </div>
                    </Link>
                  </Tooltip>
                )}

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
                  errors={errors}
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
                  errors={errors}
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

              <CardSeparator />

              <ModalFooterButtons
                submit="Simpan"
                submitColor="warning"
                isSubmitting={isSubmitting}
                onCancel={handleClose}
              />
            </>
          )}
        </Form>
      )}
    </Modal>
  )
}
