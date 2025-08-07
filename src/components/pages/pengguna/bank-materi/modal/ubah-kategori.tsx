import {
  ContentLoader,
  ControlledInput,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatKategoriBankMateriApi } from '@/services/api/pengguna/bank-materi/kategori/lihat'
import { ubahKategoriBankMateriApi } from '@/services/api/pengguna/bank-materi/kategori/ubah'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nama: z.string().pipe(required),
})

export type UbahKategoriFormSchema = {
  nama?: string
}

type UbahKategoriModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahKategoriModal({
  id,
  show,
  onHide,
}: UbahKategoriModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()

  const [formError, setFormError] = useState<string>()

  const queryKey = ['pengguna.bank-materi.kategori.ubah', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahKategoriFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await processApi(lihatKategoriBankMateriApi, id)

      return {
        nama: data?.nama_kategori,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahKategoriFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(
      processApi(ubahKategoriBankMateriApi, id, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['pengguna.bank-materi.kategori'],
          })
          queryClient.setQueryData(
            queryKey,
            (oldData: UbahKategoriFormSchema) => ({
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
      title="Ubah Kategori Materi"
      isLoading={!isLoading && isFetching}
      color="warning"
      isOpen={show}
      onClose={handleClose}
    >
      {isLoading ? (
        <ContentLoader height={154} />
      ) : (
        <Form<UbahKategoriFormSchema>
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
                <ControlledInput
                  name="nama"
                  control={control}
                  errors={errors}
                  label="Nama Kategori"
                  placeholder="Tulis nama kategori di sini"
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
