import { lihatKategoriBankMateriAction } from '@/actions/pengguna/bank-materi/kategori/lihat'
import { ubahKategoriBankMateriAction } from '@/actions/pengguna/bank-materi/kategori/ubah'
import {
  CardSeparator,
  ControlledInput,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
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
  setId(id?: string): void
}

export default function UbahKategoriModal({
  id,
  setId,
}: UbahKategoriModalProps) {
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

      const { data } = await lihatKategoriBankMateriAction(id)

      return {
        nama: data?.nama_kategori,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahKategoriFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahKategoriBankMateriAction(id, data), {
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
        setId(undefined)
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  return (
    <Modal
      title="Ubah Kategori Materi"
      isLoading={!isLoading && isFetching}
      color="warning"
      isOpen={!!id}
      onClose={() => setId(undefined)}
    >
      {isLoading || !id ? (
        <Loader height={154} />
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

              <CardSeparator />

              <ModalFooterButtons
                submit="Simpan"
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
