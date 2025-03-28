import { ubahLogoAction } from '@/actions/admin/instansi/ubah-logo'
import {
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

type UbahLogoModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function UbahLogoModal({
  show = false,
  setShow,
}: UbahLogoModalProps) {
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
        setShow(false)
        queryClient.invalidateQueries({
          queryKey: ['admin.instansi.detail', id],
        })
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
