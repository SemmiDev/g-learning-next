import {
  ControlledInput,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { ubahRiwayatObrolanAiApi } from '@/services/api/shared/riwayat-obrolan-ai/ubah'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  judul: z.string().pipe(required),
})

export type UbahRiwayatObrolanFormSchema = {
  judul?: string
}

type UbahRiwayatObrolanModalProps = {
  data?: {
    id: string
    judul: string
  }
  show: boolean
  onHide: () => void
}

export default function UbahRiwayatObrolanModal({
  data,
  show,
  onHide,
}: UbahRiwayatObrolanModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()

  const [formError, setFormError] = useState<string>()

  const initialValues = {
    judul: data?.judul,
  }

  const onSubmit: SubmitHandler<UbahRiwayatObrolanFormSchema> = async (
    submitData
  ) => {
    if (!data?.id) return

    await handleActionWithToast(
      processApi(ubahRiwayatObrolanAiApi, data.id, submitData),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['pengguna.obrolan-ai.riwayat'],
          })
          onHide()
        },
        onError: ({ message }) => setFormError(message),
      }
    )
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ubah Judul Obrolan"
      color="warning"
      isOpen={show}
      onClose={handleClose}
    >
      <Form<UbahRiwayatObrolanFormSchema>
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
                name="judul"
                control={control}
                errors={errors}
                label="Judul Obrolan"
                placeholder="Tulis judul obrolan di sini"
                required
              />

              <FormError error={formError} />
            </div>

            <ModalFooterButtons
              submit="Simpan"
              submitColor="warning"
              isSubmitting={isSubmitting}
              onCancel={handleClose}
              borderTop
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
