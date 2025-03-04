import { ubahAktifitasKonferensiAction } from '@/actions/pengguna/ruang-kelas/aktifitas/akademik/ubah-konferensi'
import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import {
  CardSeparator,
  ControlledDatePicker,
  ControlledInput,
  ControlledQuillEditor,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
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
  penjadwalan: boolean
  jadwal?: Date
}

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
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = ['pengguna.ruang-kelas.linimasa.ubah', idKelas, id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey,
    queryFn: async (): Promise<UbahKonferensiFormSchema> => {
      if (!id) return { penjadwalan: false }

      const { data } = await lihatAktifitasAction(idKelas, id)

      return {
        judul: data?.aktifitas.judul,
        catatan: data?.aktifitas.deskripsi ?? undefined,
        link: data?.link_conference,
        penjadwalan: !!data?.aktifitas.waktu_tersedia,
        jadwal: parseDate(data?.aktifitas.waktu_tersedia ?? undefined),
      }
    },
  })

  const onSubmit: SubmitHandler<UbahKonferensiFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(
      ubahAktifitasKonferensiAction(idKelas, id, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['pengguna.ruang-kelas.linimasa.list', idKelas],
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
      size="lg"
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
                  required
                />
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
