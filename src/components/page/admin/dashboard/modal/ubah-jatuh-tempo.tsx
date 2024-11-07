import { DataType } from '@/actions/admin/dashboard/table-jatuh-tempo'
import { ubahInstansiAction } from '@/actions/admin/instansi/ubah'
import {
  CardSeparator,
  ControlledDatePicker,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { parseDate } from '@/utils/date'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  jatuhTempo: z.date(),
})

export type UbahJatuhTempoFormSchema = {
  jatuhTempo?: Date
}

type UbahJatuhTempoModalProps = {
  jatuhTempo: DataType | undefined
  setJatuhTempo(value?: DataType): void
}

export default function UbahJatuhTempoModal({
  jatuhTempo,
  setJatuhTempo,
}: UbahJatuhTempoModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { id, jatuh_tempo } = jatuhTempo ?? {}

  const initialValues = {
    jatuhTempo: parseDate(jatuh_tempo),
  }

  const onSubmit: SubmitHandler<UbahJatuhTempoFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahInstansiAction(id, data), {
      loading: 'Menyimpan...',
      success: 'Berhasil mengubah jatuh tempo',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setJatuhTempo(undefined)
        queryClient.invalidateQueries({
          queryKey: ['admin.dashboard.table-jatuh-tempo'],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setJatuhTempo(undefined)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ubah Jatuh Tempo"
      color="warning"
      isOpen={!!id}
      onClose={handleClose}
      overflow
    >
      <Form<UbahJatuhTempoFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledDatePicker
                name="jatuhTempo"
                control={control}
                errors={errors}
                label="Tanggal Jatuh Tempo"
                placeholder="Tanggal Jatuh Tempo"
                showMonthDropdown
                showYearDropdown
                required
              />

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
    </Modal>
  )
}
