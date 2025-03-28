import { blokirPenggunaAction } from '@/actions/admin/pengguna/blokir'
import {
  ControlledInput,
  Form,
  Modal,
  ModalFooterButtons,
  Text,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  alasan: z.string().pipe(required),
})

export type BlokirPenggunaFormSchema = {
  alasan?: string
}

const initialValues: BlokirPenggunaFormSchema = {}

type BlokirModalProps = {
  id: string | undefined
  setId(id?: string): void
  onHideLihat: () => void
}

export default function BlokirModal({
  id,
  setId,
  onHideLihat,
}: BlokirModalProps) {
  const queryClient = useQueryClient()

  const onSubmit: SubmitHandler<BlokirPenggunaFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(blokirPenggunaAction(id, data), {
      loading: 'Menyimpan...',
      onSuccess: () => {
        setId(undefined)
        onHideLihat()

        queryClient.invalidateQueries({
          queryKey: ['admin.pengguna.table'],
        })
        queryClient.invalidateQueries({
          queryKey: ['admin.pengguna.table-diblokir'],
        })
      },
    })
  }

  return (
    <Modal
      title="Blokir Pengguna"
      size="sm"
      color="danger"
      headerClassName="[&_.modal-title]:text-lg"
      isOpen={!!id}
      onClose={() => setId(undefined)}
      closeButton={false}
    >
      <Form<BlokirPenggunaFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-y-3 p-3">
              <Text weight="semibold" variant="dark" className="text-center">
                Yakin ingin memblokir pengguna ini dari aplikasi? Tuliskan
                alasan pemblokiran
              </Text>

              <ControlledInput
                name="alasan"
                control={control}
                errors={errors}
                placeholder="Alasan pemblokiran pengguna"
              />
            </div>

            <ModalFooterButtons
              submit="Blokir Pengguna"
              submitColor="danger"
              isSubmitting={isSubmitting}
              cancel="Batal"
              onCancel={() => {
                setId(undefined)
              }}
              borderTop
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
