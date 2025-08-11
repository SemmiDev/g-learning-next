import {
  ContentLoader,
  ControlledInput,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatModulKnowledgeApi } from '@/services/api/admin/knowledge/modul/lihat'
import { ubahModulKnowledgeApi } from '@/services/api/admin/knowledge/modul/ubah'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useManajemenKnowledgeSortableStore } from '../stores/sortable'

const formSchema = z.object({
  nama: z.string().pipe(required),
})

export type UbahModulFormSchema = {
  nama?: string
}

type UbahModalProps = {
  id: string | null
  show: boolean
  onHide: () => void
}

export default function UbahModulModal({ id, show, onHide }: UbahModalProps) {
  const { jwt, processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeMediumModal()

  const { updateModulItem } = useManajemenKnowledgeSortableStore()

  const [formError, setFormError] = useState<string>()

  const queryKey = ['admin.manajemen-knowledge.modul.ubah', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahModulFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatModulKnowledgeApi(jwt, id)

      return {
        nama: data?.nama,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahModulFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(processApi(ubahModulKnowledgeApi, id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.setQueryData(queryKey, (oldData: UbahModulFormSchema) => ({
          ...oldData,
          ...data,
        }))
        queryClient.invalidateQueries({
          queryKey: ['admin.manajemen-knowledge.modul.lihat', id],
        })

        if (data?.nama) updateModulItem(id, data?.nama)

        onHide()
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ubah Modul"
      isLoading={!isLoading && isFetching}
      color="warning"
      size={size}
      isOpen={show}
      onClose={handleClose}
    >
      {isLoading ? (
        <ContentLoader height={154} />
      ) : (
        <Form<UbahModulFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
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
                submitColor="warning"
                isSubmitting={isSubmitting}
                onCancel={handleClose}
                borderTop
              />
            </>
          )}
        </Form>
      )}
    </Modal>
  )
}
