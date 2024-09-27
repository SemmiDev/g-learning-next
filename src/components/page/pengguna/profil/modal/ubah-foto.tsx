import { ubahFotoAction } from '@/actions/pengguna/profil/ubah-foto'
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
  foto: z.any().superRefine(objectRequired),
})

type FormSchema = {
  foto?: any
}

const initialValues: FormSchema = {}

type UbahFotoModalProps = {
  showModal?: boolean
  setShowModal(show: boolean): void
}

export default function UbahFotoModal({
  showModal = false,
  setShowModal,
}: UbahFotoModalProps) {
  const [formError, setFormError] = useState<string>()
  const { update: updateSession } = useSession()
  const queryClient = useQueryClient()

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const form = new FormData()
    form.append('foto', data.foto)

    await handleActionWithToast(ubahFotoAction(form), {
      loading: 'Mengunggah...',
      error: ({ message }) => message,
      onStart: () => setFormError(undefined),
      onSuccess: async ({ data }) => {
        setShowModal(false)
        queryClient.invalidateQueries({ queryKey: ['pengguna.profil'] })
        await updateSession({ picture: data?.foto })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  return (
    <Modal
      title="Ganti Foto Profil"
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
                  name="foto"
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
