import {
  ControlledUploadFile,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { ubahLogoApi } from '@/services/api/instansi/profil/detail/ubah-logo'
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
  show?: boolean
  setShow(show: boolean): void
}

export default function UbahLogoModal({
  show = false,
  setShow,
}: UbahLogoModalProps) {
  const jwt = useSessionJwt()
  const queryClient = useQueryClient()
  const { update: updateSession } = useSession()

  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const form = new FormData()
    form.append('logo', data.logo)

    await handleActionWithToast(ubahLogoApi(jwt, form), {
      loading: 'Mengunggah...',
      error: ({ message }) => message,
      onStart: () => setFormError(undefined),
      onSuccess: async ({ data }) => {
        setShow(false)
        queryClient.invalidateQueries({ queryKey: ['instansi.profil'] })
        await updateSession({ picture: data?.logo })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal title="Ganti Logo Instansi" isOpen={show} onClose={handleClose}>
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

              <ModalFooterButtons
                submit="Upload"
                isSubmitting={isSubmitting}
                onCancel={handleClose}
                borderTop
              />
            </>
          )
        }}
      </Form>
    </Modal>
  )
}
