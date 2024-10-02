import { ubahLogoAction } from '@/actions/instansi/profil/detail/ubah-logo'
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
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  logo: z.any().superRefine(objectRequired),
})

type FormSchema = {
  logo?: any
}

const initialValues: FormSchema = {}

type UbahLogoModalProps = {
  showModal?: boolean
  setShowModal(show: boolean): void
}

export default function UbahLogoModal({
  showModal = false,
  setShowModal,
}: UbahLogoModalProps) {
  const [formError, setFormError] = useState<string>()
  const { update: updateSession } = useSession()
  const queryClient = useQueryClient()

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const form = new FormData()
    form.append('logo', data.logo)

    await handleActionWithToast(ubahLogoAction(form), {
      loading: 'Mengunggah...',
      error: ({ message }) => message,
      onStart: () => setFormError(undefined),
      onSuccess: async ({ data }) => {
        setShowModal(false)
        queryClient.invalidateQueries({ queryKey: ['instansi.profil'] })
        await updateSession({ picture: data?.logo })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setShowModal(false)
    setFormError(undefined)
  }

  return (
    <Modal title="Ganti Logo Instansi" isOpen={showModal} onClose={handleClose}>
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
                onCancel={handleClose}
              />
            </>
          )
        }}
      </Form>
    </Modal>
  )
}
