import {
  CardSeparator,
  ControlledDatePicker,
  ControlledInput,
  ControlledQuillEditor,
  ControlledRadioGroup,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  RadioGroupOptionType,
} from '@/components/ui'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatAktifitasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/lihat'
import { ubahAktifitasKonferensiApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/umum/ubah-konferensi'
import { handleActionWithToast } from '@/utils/action'
import { parseDate } from '@/utils/date'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Switch } from 'rizzui'

const baseFormSchema = z.object({
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
  link: z.string().pipe(required.url()),
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

export type UbahKonferensiFormSchema = {
  judul?: string
  catatan?: string
  link?: string
  presensi: string
  penjadwalan: boolean
  jadwal?: Date
  editableLink?: boolean
}

const presensiOptions: RadioGroupOptionType[] = [
  { label: 'Aktif', value: 'aktif' },
  { label: 'Tidak Aktif', value: 'non-aktif' },
]

type UbahKonferensiModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahKonferensiModal({
  id,
  show,
  onHide,
}: UbahKonferensiModalProps) {
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
  } = useQuery<UbahKonferensiFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return { presensi: 'non-aktif', penjadwalan: false }

      const { data } = await processApi(lihatAktifitasApi, idKelas, id)

      return {
        judul: data?.aktifitas.judul,
        catatan: data?.aktifitas.deskripsi ?? undefined,
        link: data?.link_conference,
        presensi: !!data?.aktifitas.absen ? 'aktif' : 'non-aktif',
        penjadwalan: !!data?.aktifitas.waktu_tersedia,
        jadwal: parseDate(data?.aktifitas.waktu_tersedia ?? undefined),
        editableLink: data?.aktifitas.tipe_konferensi === 'Manual',
      }
    },
  })

  const onSubmit: SubmitHandler<UbahKonferensiFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(
      processApi(ubahAktifitasKonferensiApi, idKelas, id, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['pengguna.ruang-kelas.diskusi.list', idKelas],
          })
          queryClient.setQueryData(
            queryKey,
            (oldData: UbahKonferensiFormSchema) => ({
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
      title="Ubah Konferensi Dibagikan"
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
        <Form<UbahKonferensiFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
          }}
          flexing
        >
          {({
            register,
            control,
            watch,
            formState: { errors, isSubmitting },
          }) => (
            <>
              <div className="flex flex-col">
                <div className="flex flex-col gap-4 p-3">
                  <ControlledInput
                    name="judul"
                    control={control}
                    errors={errors}
                    label="Judul Konferensi"
                    placeholder="Tulis judul konferensi di sini"
                    required
                  />

                  <ControlledQuillEditor
                    name="catatan"
                    control={control}
                    errors={errors}
                    label="Catatan Tambahan"
                    placeholder="Buat catatan singkat terkait konferensi yang diberikan"
                    toolbar="minimalist"
                  />

                  <ControlledInput
                    name="link"
                    control={control}
                    errors={errors}
                    label="Link Konferensi"
                    placeholder="Tulis link konferensi di sini"
                    disabled={!watch('editableLink')}
                    required
                  />

                  <ControlledRadioGroup
                    name="presensi"
                    control={control}
                    options={presensiOptions}
                    errors={errors}
                    label="Presensi"
                    className="flex gap-8 my-2"
                    groupClassName="gap-8"
                    labelClassName="mb-0"
                  />
                </div>

                <CardSeparator />

                <div className="flex gap-x-4 gap-y-1 flex-wrap p-3">
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
