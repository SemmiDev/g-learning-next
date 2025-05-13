import { gabungAnggotaKelasAction } from '@/services/api/pengguna/ruang-kelas/anggota-kelas/peserta/gabung'
import {
  ControlledInput,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  Text,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { wait } from '@/utils/wait'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  kode: z.string().pipe(required),
})

export type GabungKelasFormSchema = {
  kode?: string
}

const initialValues: GabungKelasFormSchema = {}

type GabungKelasModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function GabungKelasModal({
  show = false,
  setShow,
}: GabungKelasModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()
  const [successAlert, setSuccessAlert] = useState<string>()

  const onSubmit: SubmitHandler<GabungKelasFormSchema> = async (data) => {
    if (!data.kode) return

    await handleActionWithToast(gabungAnggotaKelasAction(data.kode), {
      loading: 'Mengajukan bergabung...',
      success: 'Berhasil mengajukan bergabung',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setSuccessAlert('Kamu akan bergabung kedalam kelas sebagai peserta')

        queryClient.invalidateQueries({
          queryKey: ['pengguna.ruang-kelas.list', 'Diikuti', 'Umum'],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = async () => {
    setShow(false)
    setFormError(undefined)

    if (!successAlert) return
    // wait for modal to close
    await wait(300)
    setSuccessAlert(undefined)
  }

  return (
    <Modal
      title="Gabung ke Kelas"
      headerClassName="[&_.modal-title]:text-lg"
      color="white"
      isOpen={show}
      onClose={handleClose}
    >
      <Form<GabungKelasFormSchema>
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
                {successAlert ? (
                  <div className="flex justify-center bg-success-lighter/40 rounded-lg p-2">
                    <Text
                      size="sm"
                      weight="bold"
                      color="success"
                      variant="dark"
                    >
                      {successAlert}
                    </Text>
                  </div>
                ) : (
                  <>
                    <ControlledInput
                      name="kode"
                      control={control}
                      errors={errors}
                      label="Kode Kelas"
                      placeholder="Tulis kode kelas di sini"
                      autoFocus
                      required
                    />

                    <FormError error={formError} />
                  </>
                )}
              </div>

              <ModalFooterButtons
                submit={!successAlert ? 'Gabung' : undefined}
                isSubmitting={isSubmitting}
                cancel={successAlert ? 'Tutup' : 'Batal'}
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
