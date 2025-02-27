import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { ubahAktifitasMateriSesiAction } from '@/actions/pengguna/ruang-kelas/aktifitas/sesi/ubah-materi'
import {
  CardSeparator,
  ControlledInput,
  ControlledPustakaMedia,
  ControlledQuillEditor,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  PustakaMediaFileType,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { getFileSize, getFileType } from '@/utils/file-properties-from-api'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
  berkas: z.array(z.any()),
})

export type UbahMateriSesiFormSchema = {
  judul?: string
  catatan?: string
  berkas: PustakaMediaFileType[]
}

type UbahMateriSesiModalProps = {
  idSesi: string
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahMateriSesiModal({
  idSesi,
  id,
  show,
  onHide,
}: UbahMateriSesiModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = [
    'pengguna.ruang-kelas.sesi-pembelajaran.bahan-ajar.ubah',
    idKelas,
    id,
  ]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey,
    queryFn: async (): Promise<UbahMateriSesiFormSchema> => {
      if (!id)
        return {
          berkas: [],
        }

      const { data } = await lihatAktifitasAction(idKelas, id)

      return {
        judul: data?.aktifitas.judul,
        catatan: data?.aktifitas.deskripsi ?? undefined,
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

  const onSubmit: SubmitHandler<UbahMateriSesiFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(
      ubahAktifitasMateriSesiAction(idKelas, id, data),
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
          queryClient.setQueryData(
            queryKey,
            (oldData: UbahMateriSesiFormSchema) => ({
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
      size="lg"
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      {isLoading ? (
        <Loader height={500} />
      ) : (
        <Form<UbahMateriSesiFormSchema>
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
