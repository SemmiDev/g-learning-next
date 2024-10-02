import { lihatBankMateriAction } from '@/actions/pengguna/bank-materi/lihat'
import { ubahBankMateriAction } from '@/actions/pengguna/bank-materi/ubah'
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
  TextBordered,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { getFileType } from '@/utils/file-properties-from-api'
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

export type UbahMateriFormSchema = {
  tipe?: string
  judul?: string
  catatan?: string
  berkas?: PustakaMediaFileType[]
}

type UbahMateriModalProps = {
  id: string | undefined
  setId(id?: string): void
}

export default function UbahMateriModal({ id, setId }: UbahMateriModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { kategori: idKategori }: { kategori: string } = useParams()

  const queryKey = ['pengguna.bank-materi.ubah', idKategori, id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahMateriFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatBankMateriAction(idKategori, id)

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
    if (!id) return

    await handleActionWithToast(ubahBankMateriAction(idKategori, id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['pengguna.bank-materi.list', idKategori],
        })
        queryClient.setQueryData(queryKey, (oldData: UbahMateriFormSchema) => ({
          ...oldData,
          ...data,
        }))
        setId(undefined)
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  return (
    <Modal
      title="Ubah Bank Materi"
      isLoading={!isLoading && isFetching}
      color="warning"
      size="lg"
      isOpen={!!id}
      onClose={() => setId(undefined)}
    >
      {isLoading || !id ? (
        <Loader height={447} />
      ) : (
        <Form<UbahMateriFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
          }}
        >
          {({ control, formState: { errors, isSubmitting } }) => (
            <>
              <div className="flex flex-col gap-4 p-3">
                <TextBordered label="Tipe">{initialValues?.tipe}</TextBordered>

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
                  label="Catatan Ubahan"
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
                submit="Simpan Materi"
                submitColor="warning"
                isSubmitting={isSubmitting}
                onCancel={() => setId(undefined)}
              />
            </>
          )}
        </Form>
      )}
    </Modal>
  )
}
