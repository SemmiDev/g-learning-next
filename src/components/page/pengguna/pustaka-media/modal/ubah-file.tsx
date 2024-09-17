import { lihatBerkasAction } from '@/actions/pengguna/pustaka-media/lihat-berkas'
import { ubahFileAction } from '@/actions/pengguna/pustaka-media/ubah-file'
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
import { QueryKey, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nama: z.string().pipe(required),
})

export type UbahFileFormSchema = {
  nama?: string
}

type UbahModalProps = {
  id: string | undefined
  setId(id?: string): void
  refetchKey: QueryKey
}

export default function UbahFileModal({
  id,
  setId,
  refetchKey,
}: UbahModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const queryKey = ['pengguna.pustaka-media.files.ubah-file', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahFileFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatBerkasAction(id)

      return {
        nama: data?.nama,
        file: data?.url,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahFileFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahFileAction(id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: refetchKey })
        queryClient.setQueryData(queryKey, (oldData: UbahFileFormSchema) => ({
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
      title="Ubah File"
      isLoading={!isLoading && isFetching}
      color="warning"
      isOpen={!!id}
      onClose={() => setId(undefined)}
    >
      {isLoading || !id ? (
        <Loader height={236} />
      ) : (
        <Form<UbahFileFormSchema>
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
                  label="Label"
                  placeholder="Label File"
                  required
                />

                <FormError error={formError} />
              </div>

              <CardSeparator />

              <ModalFooterButtons
                submit="Simpan"
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
