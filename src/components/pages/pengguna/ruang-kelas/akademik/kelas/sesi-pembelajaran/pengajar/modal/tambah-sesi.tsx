import {
  ControlledAsyncPaginateSelect,
  ControlledDatePicker,
  ControlledInput,
  ControlledRadioGroup,
  ControlledSelect,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  RadioGroupOptionType,
  SelectOptionType,
} from '@/components/ui'
import { NAMA_HARI } from '@/config/const'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { tambahSesiAction } from '@/services/actions/pengguna/ruang-kelas/sesi-pembelajaran/pengajar/tambah-sesi'
import { ruanganMakeSelectDataApi } from '@/services/api/pengguna/ruang-kelas/async-select/ruangan'
import { listSesiPembelajaranApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/list'
import { handleActionWithToast } from '@/utils/action'
import { parseDateFromTime } from '@/utils/date'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsInfoCircle } from 'react-icons/bs'

const formSchema = z.object({
  pertemuan: z.number(),
  judul: z.string().pipe(required),
  hari: z.any().superRefine(objectRequired),
  mulai: z.date(),
  sampai: z.date(),
  mulaiWaktu: z.string(),
  sampaiWaktu: z.string(),
  ruangan: z.any().superRefine(objectRequired),
  jenisAbsenPeserta: z.string(),
})

const hariOptions: SelectOptionType[] = NAMA_HARI.map((hari) => ({
  label: hari,
  value: hari,
}))

const jenisAbsenOptions: RadioGroupOptionType[] = [
  { label: 'Presensi Manual', value: 'Manual' },
  { label: 'Presensi Otomatis', value: 'Otomatis' },
  { label: 'Presensi GPS', value: 'GPS' },
  { label: 'Presensi Swafoto', value: 'Swafoto' },
  { label: 'Presensi GPS dan Swafoto', value: 'GPS dan Swafoto' },
  { label: 'Presensi QR Code', value: 'QR Code' },
]

export type TambahSesiFormSchema = {
  pertemuan?: number
  judul?: string
  hari?: SelectOptionType
  mulai?: Date
  sampai?: Date
  mulaiWaktu?: string
  sampaiWaktu?: string
  ruangan?: SelectOptionType
  jenisAbsenPeserta?: string
}

type TambahSesiModalProps = {
  show: boolean
  onHide: () => void
}

export default function TambahSesiModal({
  show,
  onHide,
}: TambahSesiModalProps) {
  const { jwt } = useSessionJwt()
  const queryClient = useQueryClient()

  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = [
    'pengguna.ruang-kelas.sesi-pembelajaran.sesi-terakhir',
    'pengajar',
    idKelas,
    show,
  ]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<TambahSesiFormSchema>({
    queryKey,
    queryFn: async () => {
      const { data } = await listSesiPembelajaranApi({
        jwt,
        idKelas,
        perPage: 1,
        sortBy: 'pertemuan',
        order: 'desc',
      })

      const sesiTerakhir = data?.list?.[0]
      const pertemuan = (sesiTerakhir?.pertemuan ?? 0) + 1

      return {
        pertemuan,
        judul: `Pertemuan ${pertemuan}`,
        hari:
          hariOptions.filter(
            (hari) => hari.value === data?.list?.[0]?.hari
          )[0] ?? undefined,
        mulai: parseDateFromTime(sesiTerakhir?.waktu_mulai),
        sampai: parseDateFromTime(sesiTerakhir?.waktu_sampai),
        mulaiWaktu: sesiTerakhir?.waktu_mulai,
        sampaiWaktu: sesiTerakhir?.waktu_sampai,
        ruangan: sesiTerakhir?.id_ruangan
          ? {
              label: sesiTerakhir?.lokasi_pertemuan,
              value: sesiTerakhir?.id_ruangan,
            }
          : undefined,
        jenisAbsenPeserta: jenisAbsenOptions[0].value,
      }
    },
  })

  const onSubmit: SubmitHandler<TambahSesiFormSchema> = async (data) => {
    await handleActionWithToast(tambahSesiAction(idKelas, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            'pengguna.ruang-kelas.sesi-pembelajaran.list',
            'pengajar',
            idKelas,
          ],
        })
        onHide()
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  const ruanganSelectDataApi = useMemo(
    () => ruanganMakeSelectDataApi(idKelas),
    [idKelas]
  )

  return (
    <Modal
      title="Tambah Sesi Pembelajaran"
      isLoading={!isLoading && isFetching}
      color="primary"
      size="lg"
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      {isLoading ? (
        <Loader height={154} />
      ) : (
        <Form<TambahSesiFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
          }}
        >
          {({ control, setValue, formState: { errors, isSubmitting } }) => (
            <>
              <div className="flex flex-col gap-4 p-3">
                <ControlledInput
                  name="judul"
                  control={control}
                  errors={errors}
                  label="Judul Sesi"
                  placeholder="Tulis judul sesi di sini"
                  required
                />

                <ControlledSelect
                  name="hari"
                  control={control}
                  errors={errors}
                  options={hariOptions}
                  label="Hari"
                  placeholder="Pilih nama hari"
                  required
                />

                <div className="flex flex-col flex-2 gap-y-2 xs:flex-row">
                  <ControlledDatePicker
                    control={control}
                    name="mulai"
                    onChange={(val) =>
                      setValue('mulaiWaktu', moment(val).format('HH:mm'))
                    }
                    errors={errors}
                    label="Waktu Mulai"
                    placeholder="Mulai"
                    className="flex-1 xs:[&_.rizzui-input-container]:rounded-r-none"
                    dateFormat={'HH:mm'}
                    timeFormat="HH:mm"
                    showTimeSelect
                    showTimeSelectOnly
                  />
                  <ControlledDatePicker
                    control={control}
                    name="sampai"
                    onChange={(val) =>
                      setValue('sampaiWaktu', moment(val).format('HH:mm'))
                    }
                    errors={errors}
                    label="Sampai"
                    placeholder="Sampai"
                    className="flex-1 xs:[&_.rizzui-input-container]:rounded-none"
                    dateFormat={'HH:mm'}
                    timeFormat="HH:mm"
                    showTimeSelect
                    showTimeSelectOnly
                  />
                </div>

                <ControlledAsyncPaginateSelect
                  name="ruangan"
                  control={control}
                  label="Ruangan"
                  placeholder="Pilih Ruangan"
                  action={ruanganSelectDataApi}
                  construct={(data) => ({
                    label: data.nama_ruangan,
                    value: data.id,
                  })}
                  errors={errors}
                  required
                />

                <ControlledRadioGroup
                  name="jenisAbsenPeserta"
                  control={control}
                  errors={errors}
                  label="Jenis Presensi Peserta"
                  className="flex flex-col gap-x-8 gap-y-4 my-2 xs:flex-row"
                  groupClassName="flex-wrap gap-x-8 gap-y-4"
                  optionClassNames="w-full xs:w-auto"
                  labelClassName="mb-0"
                  options={jenisAbsenOptions}
                />

                <FormError error={formError} />
              </div>

              <ModalFooterButtons
                submit="Simpan"
                isSubmitting={isSubmitting}
                onCancel={handleClose}
                borderTop
              />
            </>
          )}
        </Form>
      )}
    </Modal>
  )
}
