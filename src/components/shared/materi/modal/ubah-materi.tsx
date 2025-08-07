import {
  ContentLoader,
  ControlledInput,
  ControlledPustakaMedia,
  ControlledQuillEditor,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  PustakaMediaFileType,
  TextBordered,
} from '@/components/ui'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatMateriApi } from '@/services/api/shared/materi/lihat'
import { ubahMateriApi } from '@/services/api/shared/materi/ubah'
import { handleActionWithToast } from '@/utils/action'
import { getFileType } from '@/utils/file-properties-from-api'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
  berkas: z.array(z.any()),
})

export type UbahMateriFormSchema = {
  tipe?: string
  judul?: string
  catatan?: string
  berkas?: PustakaMediaFileType[]
}

type UbahMateriModalProps = {
  idKategori: string | undefined
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahMateriModal({
  idKategori,
  id,
  show,
  onHide,
}: UbahMateriModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()

  const [formError, setFormError] = useState<string>()

  const queryKey = ['shared.materi.ubah', idKategori, id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahMateriFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!idKategori || !id) return {}

      const { data } = await processApi(lihatMateriApi, idKategori, id)

      return {
        tipe: data?.bank_ajar.tipe ?? 'Materi',
        judul: data?.bank_ajar.judul ?? '',
        catatan: data?.bank_ajar.deskripsi ?? '',
        berkas: (data?.daftar_file_bank_ajar ?? []).map((item) => ({
          id: item.id,
          name: item.nama,
          time: item.created_at,
          link: item.url,
          extension: item.ekstensi,
          size: item.ukuran,
          folder: false,
          type: getFileType(item),
          driveId: item.id_instansi ?? undefined,
        })),
      }
    },
  })

  const onSubmit: SubmitHandler<UbahMateriFormSchema> = async (data) => {
    if (!idKategori || !id) return

    await handleActionWithToast(
      processApi(ubahMateriApi, idKategori, id, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['shared.materi.list', idKategori],
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
      title="Ubah Bank Materi"
      isLoading={!isLoading && isFetching}
      color="warning"
      size={size}
      isOpen={show}
      onClose={handleClose}
    >
      {isLoading ? (
        <ContentLoader height={447} />
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
          {({ control, formState: { errors, isSubmitting } }) => (
            <>
              <div className="flex flex-col gap-4 p-3">
                <TextBordered label="Tipe">
                  {initialValues?.tipe
                    ? initialValues?.tipe === 'Materi'
                      ? 'Materi'
                      : 'Tugas'
                    : '-'}
                </TextBordered>

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

              <ModalFooterButtons
                submit="Simpan Materi"
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
