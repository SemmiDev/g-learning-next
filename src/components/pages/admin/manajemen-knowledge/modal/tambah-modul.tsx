import {
  ControlledInput,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { tambahModulKnowledgeApi } from '@/services/api/admin/knowledge/modul/tambah'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useManajemenKnowledgeSortableStore } from '../stores/sortable'

const formSchema = z.object({
  nama: z.string().pipe(required),
})

export type TambahModulFormSchema = {
  nama?: string
}

const initialValues: TambahModulFormSchema = {}

type TambahModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function TambahModulModal({
  show = false,
  setShow,
}: TambahModalProps) {
  const { processApi } = useSessionJwt()
  const size = useAutoSizeMediumModal()

  const { addModulItem } = useManajemenKnowledgeSortableStore()

  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<TambahModulFormSchema> = async (data) => {
    await handleActionWithToast(processApi(tambahModulKnowledgeApi, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: ({ data }) => {
        setShow(false)

        if (!data?.id) return

        addModulItem(data?.id, data?.nama)
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal title="Tambah Modul" size={size} isOpen={show} onClose={handleClose}>
      <Form<TambahModulFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
        flexing
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledInput
                name="nama"
                control={control}
                errors={errors}
                label="Nama Modul"
                placeholder="Ketikkan nama modul di sini"
                required
              />

              <FormError error={formError} />
            </div>

            <ModalFooterButtons
              submit="Simpan"
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
