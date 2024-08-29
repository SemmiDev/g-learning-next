import { ubahLogoAction } from '@/actions/admin/instansi/ubah-logo'
import {
  CardSeparator,
  ControlledUploadFile,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  logo: z.any().superRefine(objectRequired),
})

type FormSchema = {
  logo?: any
}

const initialValues: FormSchema = {}

export default function UbahLogoModal({
  showModal = false,
  setShowModal,
}: {
  showModal?: boolean
  setShowModal(show: boolean): void
}) {
  const [formError, setFormError] = useState<string>()
  const params = useParams()
  const id = params.id as string
  const queryClient = useQueryClient()

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const form = new FormData()
    form.append('logo', data.logo)

    await handleActionWithToast(ubahLogoAction(id, form), {
      loading: 'Mengunggah...',
      error: ({ message }) => message,
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShowModal(false)
        queryClient.invalidateQueries({
          queryKey: ['admin.instansi.detail', id],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  return (
    <Modal
      title="Ganti Logo Instansi"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Form<FormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
      >
        {({ control, formState: { errors, isSubmitting } }) => {
          return (
            <>
              <div className="flex flex-col gap-4 p-3">
                <ControlledUploadFile
                  name="logo"
                  control={control}
                  errors={errors}
                  accept={{ 'image/*': [] }}
                />

                <FormError error={formError} />
              </div>

              <CardSeparator />

              <ModalFooterButtons
                submit="Upload"
                isSubmitting={isSubmitting}
                onCancel={() => setShowModal(false)}
              />
            </>
          )
        }}
      </Form>
    </Modal>
  )
}
