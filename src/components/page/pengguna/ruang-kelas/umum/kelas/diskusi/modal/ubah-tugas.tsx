import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { ubahAktifitasTugasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/umum/ubah-tugas'
import {
  CardSeparator,
  ControlledDatePicker,
  ControlledInput,
  ControlledPustakaMedia,
  ControlledQuillEditor,
  ControlledSwitch,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  PustakaMediaFileType,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { parseDate } from '@/utils/date'
import { getFileSize, getFileType } from '@/utils/file-properties-from-api'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const baseFormSchema = z.object({
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
  berkas: z.array(z.any()),
})

const formSchema = z.discriminatedUnion('dibatasiWaktu', [
  z
    .object({
      dibatasiWaktu: z.literal(false),
    })
    .merge(baseFormSchema),
  z
    .object({
      dibatasiWaktu: z.literal(true),
      batasWaktu: z.date(),
    })
    .merge(baseFormSchema),
])

export type UbahTugasFormSchema = {
  judul?: string
  catatan?: string
  dibatasiWaktu: boolean
  batasWaktu?: Date
  berkas: PustakaMediaFileType[]
}

type UbahTugasModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahTugasModal({
  id,
  show,
  onHide,
}: UbahTugasModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = ['pengguna.ruang-kelas.diskusi.ubah', idKelas, id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahTugasFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id)
        return {
          dibatasiWaktu: false,
          share: true,
          berkas: [],
        }

      const { data } = await lihatAktifitasAction(idKelas, id)

      return {
        judul: data?.aktifitas.judul,
        catatan: data?.aktifitas.deskripsi ?? undefined,
        dibatasiWaktu: !!data?.aktifitas.batas_waktu,
        batasWaktu: parseDate(data?.aktifitas.batas_waktu ?? undefined),
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

  const onSubmit: SubmitHandler<UbahTugasFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahAktifitasTugasAction(idKelas, id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.diskusi.list', idKelas],
        })
        queryClient.setQueryData(queryKey, (oldData: UbahTugasFormSchema) => ({
          ...oldData,
          ...data,
        }))
        onHide()
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ubah Tugas Dibagikan"
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
        <Form<UbahTugasFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
          }}
        >
          {({ control, watch, formState: { errors, isSubmitting } }) => (
            <>
              <div className="flex flex-col gap-4 p-3">
                <ControlledInput
                  name="judul"
                  control={control}
                  errors={errors}
                  label="Judul Tugas"
                  placeholder="Tulis judul tugas di sini"
                  required
                />

                <ControlledQuillEditor
                  name="catatan"
                  control={control}
                  errors={errors}
                  label="Catatan Tambahan"
                  placeholder="Buat catatan singkat terkait tugas yang diberikan"
                  toolbar="minimalist"
                />

                <ControlledPustakaMedia
                  name="berkas"
                  control={control}
                  label="Pilih Berkas"
                  errors={errors}
                  multiple
                />

                <div className="flex gap-x-4 px-3 py-3">
                  <ControlledSwitch
                    name="dibatasiWaktu"
                    control={control}
                    label="Opsi Batas Waktu Penyerahan"
                  />
                  {watch('dibatasiWaktu', false) && (
                    <ControlledDatePicker
                      name="batasWaktu"
                      control={control}
                      errors={errors}
                      placeholder="Atur Tanggal dan Jam Batas Waktu"
                      showTimeSelect
                      dateFormat="dd MMMM yyyy HH:mm"
                      timeFormat="HH:mm"
                      className="flex-1"
                    />
                  )}
                </div>
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
