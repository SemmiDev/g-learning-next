import { lihatBerkasAction } from '@/actions/shared/pustaka-media/lihat-berkas'
import { ubahLinkAction } from '@/actions/shared/pustaka-media/ubah-link'
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
  link: z.string().pipe(required),
})

export type UbahLinkFormSchema = {
  nama?: string
  link?: string
}

type UbahModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
  googleDrive?: boolean
  refetchKey: QueryKey
}

export default function UbahLinkModal({
  id,
  show,
  onHide,
  googleDrive,
  refetchKey,
}: UbahModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const queryKey = ['shared.pustaka-media.files.ubah-link', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahLinkFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatBerkasAction(id)

      return {
        nama: data?.nama,
        link: data?.url,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahLinkFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahLinkAction(id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: refetchKey })
        queryClient.setQueryData(queryKey, (oldData: UbahLinkFormSchema) => ({
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
      title="Ubah Link"
      isLoading={!isLoading && isFetching}
      color="warning"
      isOpen={show}
      onClose={handleClose}
    >
      {isLoading ? (
        <Loader height={236} />
      ) : (
        <Form<UbahLinkFormSchema>
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
                  placeholder="Label Link"
                  required
                />

                {!googleDrive && (
                  <ControlledInput
                    name="link"
                    control={control}
                    errors={errors}
                    type="url"
                    label="Link"
                    placeholder="Masukkan link"
                  />
                )}

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
