import {
  ControlledInput,
  ControlledQuillEditor,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatAktifitasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/lihat'
import { ubahAktifitasKonferensiSesiApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/sesi/ubah-konferensi'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  judul: z.string().pipe(required),
  catatan: z.string().optional(),
  link: z.string().pipe(required.url()),
})

export type UbahKonferensiSesiFormSchema = {
  judul?: string
  catatan?: string
  link?: string
}

type UbahKonferensiSesiModalProps = {
  idSesi: string
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahKonferensiSesiModal({
  idSesi,
  id,
  show,
  onHide,
}: UbahKonferensiSesiModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()

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
    queryFn: async (): Promise<UbahKonferensiSesiFormSchema> => {
      if (!id) return {}

      const { data } = await processApi(lihatAktifitasApi, idKelas, id)

      return {
        judul: data?.aktifitas.judul,
        catatan: data?.aktifitas.deskripsi ?? undefined,
        link: data?.link_conference,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahKonferensiSesiFormSchema> = async (
    data
  ) => {
    if (!id) return

    await handleActionWithToast(
      processApi(ubahAktifitasKonferensiSesiApi, idKelas, id, data),
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
            (oldData: UbahKonferensiSesiFormSchema) => ({
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
        <Form<UbahKonferensiSesiFormSchema>
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

                <FormError error={formError} />
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
