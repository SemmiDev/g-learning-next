import { lihatBerkasAction } from '@/actions/shared/pustaka-media/lihat-berkas'
import { ubahFolderAction } from '@/actions/shared/pustaka-media/ubah-folder'
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
  deskripsi: z.string().optional(),
})

export type UbahFolderFormSchema = {
  nama?: string
  deskripsi?: string
}

type UbahModalProps = {
  id: string | undefined
  setId(id?: string): void
  refetchKeys: QueryKey[]
}

export default function UbahFolderModal({
  id,
  setId,
  refetchKeys,
}: UbahModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const queryKey = ['shared.pustaka-media.files.ubah-folder', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahFolderFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatBerkasAction(id)

      return {
        nama: data?.nama,
        deskripsi: data?.deskripsi,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahFolderFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahFolderAction(id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        for (const refetchKey of refetchKeys) {
          queryClient.invalidateQueries({ queryKey: refetchKey })
        }
        queryClient.setQueryData(queryKey, (oldData: UbahFolderFormSchema) => ({
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
      title="Ubah Folder"
      isLoading={!isLoading && isFetching}
      color="warning"
      isOpen={!!id}
      onClose={() => setId(undefined)}
    >
      {isLoading || !id ? (
        <Loader height={236} />
      ) : (
        <Form<UbahFolderFormSchema>
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
                  label="Nama Folder"
                  placeholder="Nama Folder"
                  required
                />

                <ControlledInput
                  name="deskripsi"
                  control={control}
                  errors={errors}
                  label="Tulis deskripsi folder jika ada"
                  placeholder="Deskripsi"
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
