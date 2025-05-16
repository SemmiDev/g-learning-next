import {
  ControlledUploadFile,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { ubahFotoApi } from '@/services/api/pengguna/profil/ubah-foto'
import { handleActionWithToast } from '@/utils/action'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  foto: z.any().superRefine(objectRequired),
})

type FormSchema = {
  foto?: any
}

const initialValues: FormSchema = {}

type UbahFotoModalProps = {
  show: boolean
  setShow(show: boolean): void
}

export default function UbahFotoModal({ show, setShow }: UbahFotoModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const { update: updateSession } = useSession()

  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const form = new FormData()
    form.append('foto', data.foto)

    await handleActionWithToast(processApi(ubahFotoApi, form), {
      loading: 'Mengunggah...',
      error: ({ message }) => message,
      onStart: () => setFormError(undefined),
      onSuccess: async ({ data }) => {
        setShow(false)
        queryClient.invalidateQueries({ queryKey: ['pengguna.profil'] })
        await updateSession({ picture: data?.foto })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal title="Ganti Foto Profil" isOpen={show} onClose={handleClose}>
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
                  name="foto"
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
