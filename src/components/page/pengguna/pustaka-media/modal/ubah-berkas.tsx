import { lihatBerkasAction } from '@/actions/shared/pustaka-media/lihat-berkas'
import { ubahBerkasAction } from '@/actions/shared/pustaka-media/ubah-berkas'
import {
  CardSeparator,
  ControlledInput,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  Text,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { QueryKey, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Alert } from 'rizzui'

const formSchema = z.object({
  nama: z.string().pipe(required),
})

export type UbahBerkasFormSchema = {
  nama?: string
}

type UbahModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
  refetchKey: QueryKey
}

export default function UbahBerkasModal({
  id,
  show,
  onHide,
  refetchKey,
}: UbahModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const queryKey = ['pengguna.pustaka-media.berkass.ubah-berkas', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahBerkasFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatBerkasAction(id)

      return {
        nama: data?.nama,
        berkas: data?.url,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahBerkasFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahBerkasAction(id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: refetchKey })
        queryClient.setQueryData(queryKey, (oldData: UbahBerkasFormSchema) => ({
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
      title="Ubah Berkas"
      isLoading={!isLoading && isFetching}
      color="warning"
      headerIcon="warning"
      isOpen={show}
      onClose={handleClose}
    >
      {isLoading ? (
        <Loader height={236} />
      ) : (
        <Form<UbahBerkasFormSchema>
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
                <Alert color="warning">
                  <Text
                    size="sm"
                    weight="medium"
                    variant="dark"
                    className="break-normal"
                  >
                    Mengubah nama berkas akan mengubah{' '}
                    <strong>link berkas</strong>. Pastikan link berkas masih{' '}
                    <strong>belum digunakan</strong> jika ingin mengubah!
                  </Text>
                </Alert>

                <ControlledInput
                  name="nama"
                  control={control}
                  errors={errors}
                  label="Nama Berkas"
                  placeholder="Masukkan nama berkas"
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
