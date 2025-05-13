import { lihatKategoriMateriAction } from '@/services/api/shared/materi/lihat-kategori'
import { ubahKategoriMateriAction } from '@/services/api/shared/materi/ubah-kategori'
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
  show: boolean
  onHide: () => void
}

export default function UbahKategoriModal({
  id,
  show,
  onHide,
}: UbahKategoriModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const queryKey = ['shared.materi.kategori.ubah', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahKategoriFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatKategoriMateriAction(id)

      return {
        nama: data?.nama_kategori,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahKategoriFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahKategoriMateriAction(id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['shared.materi.kategori'],
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
    })
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
                onCancel={handleClose}
              />
            </>
          )}
        </Form>
      )}
    </Modal>
  )
}
