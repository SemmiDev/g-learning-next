import {
  CardSeparator,
  ControlledDatePicker,
  ControlledInput,
  ControlledPustakaMedia,
  ControlledQuillEditor,
  ControlledRadioGroup,
  ControlledSwitch,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  PustakaMediaFileType,
  RadioGroupOptionType,
} from '@/components/ui'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatAktifitasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/lihat'
import { ubahAktifitasMateriApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/umum/ubah-materi'
import { handleActionWithToast } from '@/utils/action'
import { parseDate } from '@/utils/date'
import { getFileSize, getFileType } from '@/utils/file-properties-from-api'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsInfoCircle } from 'react-icons/bs'

const baseFormSchema = z.object({
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
  berkas: z.array(z.any()),
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

export type UbahMateriFormSchema = {
  judul?: string
  catatan?: string
  presensi: string
  tipe_presensi: string
  penjadwalan: boolean
  jadwal?: Date
  berkas: PustakaMediaFileType[]
}

const presensiOptions: RadioGroupOptionType[] = [
  { label: 'Aktif', value: 'aktif' },
  { label: 'Tidak Aktif', value: 'non-aktif' },
]

const tipePresensiOptions: RadioGroupOptionType[] = [
  { label: 'Presensi Manual', value: 'Manual' },
  { label: 'Presensi Otomatis', value: 'Otomatis' },
  { label: 'Presensi GPS', value: 'GPS' },
  { label: 'Presensi GPS dan Swafoto', value: 'GPS dan Swafoto' },
]

type UbahMateriModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahMateriModal({
  id,
  show,
  onHide,
}: UbahMateriModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()

  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = ['pengguna.ruang-kelas.diskusi.ubah', idKelas, id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahMateriFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id)
        return {
          presensi: 'non-aktif',
          tipe_presensi: 'Manual',
          penjadwalan: false,
          berkas: [],
        }

      const { data } = await processApi(lihatAktifitasApi, idKelas, id)

      return {
        judul: data?.aktifitas.judul,
        catatan: data?.aktifitas.deskripsi ?? undefined,
        presensi: data?.aktifitas.absen ? 'aktif' : 'non-aktif',
        tipe_presensi: data?.aktifitas.absen ?? 'Manual',
        penjadwalan: !!data?.aktifitas.waktu_tersedia,
        jadwal: parseDate(data?.aktifitas.waktu_tersedia ?? undefined),
        berkas: (data?.file_aktifitas ?? []).map((item) => ({
          id: item.id,
          name: item.nama,
          time: item.created_at,
          link: item.url,
          extension: item.ekstensi,
          folder: false,
          size: getFileSize(item),
          type: getFileType(item),
          driveId: item.id_instansi ?? undefined,
        })),
      }
    },
  })

  const onSubmit: SubmitHandler<UbahMateriFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(
      processApi(ubahAktifitasMateriApi, idKelas, id, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['pengguna.ruang-kelas.diskusi.list', idKelas],
          })
          queryClient.setQueryData(
            queryKey,
            (oldData: UbahMateriFormSchema) => ({
              ...oldData,
              ...data,
            })
          )
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
      title="Ubah Materi Dibagikan"
      isLoading={!isLoading && isFetching}
      color="warning"
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      {isLoading ? (
        <Loader height={500} />
      ) : (
        <Form<UbahMateriFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
          }}
          flexing
        >
          {({ control, watch, formState: { errors, isSubmitting } }) => (
            <>
              <div className="flex flex-col">
                <div className="flex flex-col gap-4 p-3">
                  <ControlledInput
                    name="judul"
                    control={control}
                    errors={errors}
                    label="Judul Materi"
                    placeholder="Tulis judul materi di sini"
                    required
                  />

                  <ControlledQuillEditor
                    name="catatan"
                    control={control}
                    errors={errors}
                    label="Catatan Tambahan"
                    placeholder="Buat catatan singkat terkait materi yang diberikan"
                    toolbar="minimalist"
                  />

                  <ControlledPustakaMedia
                    name="berkas"
                    control={control}
                    label="Pilih Berkas"
                    errors={errors}
                    multiple
                  />

                  <ControlledRadioGroup
                    name="presensi"
                    control={control}
                    options={presensiOptions}
                    errors={errors}
                    label="Presensi"
                    className="flex flex-col gap-x-8 gap-y-4 my-2 xs:flex-row"
                    groupClassName="flex-wrap gap-x-8 gap-y-4"
                    optionClassNames="w-full xs:w-auto"
                    labelClassName="mb-0"
                  />

                  {watch('presensi') === 'aktif' && (
                    <ControlledRadioGroup
                      name="tipe_presensi"
                      control={control}
                      options={tipePresensiOptions}
                      errors={errors}
                      label="Atur Presensi"
                      className="flex flex-col gap-x-8 gap-y-4 my-2 xs:flex-row"
                      groupClassName="flex-wrap gap-x-8 gap-y-4"
                      optionClassNames="w-full xs:w-auto"
                      labelClassName="mb-0"
                    />
                  )}
                </div>

                <CardSeparator />

                <div className="flex gap-x-4 gap-y-1 flex-wrap p-3">
                  <ControlledSwitch
                    name="penjadwalan"
                    control={control}
                    label="Opsi Penjadwalan"
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
                      className="flex-1 min-w-72"
                    />
                  )}
                </div>

                <div className="px-3">
                  <FormError error={formError} />
                </div>
              </div>

              <ModalFooterButtons
                submit="Simpan"
                submitColor="warning"
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
