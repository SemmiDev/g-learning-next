import { tambahKategoriBankMateriAction } from '@/actions/pengguna/bank-materi/kategori/tambah'
import {
  CardSeparator,
  ControlledInput,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nama: z.string().pipe(required),
})

export type TambahKategoriFormSchema = {
  nama?: string
}

const initialValues: TambahKategoriFormSchema = {}

type TambahKategoriModalProps = {
  showModal?: boolean
  setShowModal(show: boolean): void
}

export default function TambahKategoriModal({
  showModal = false,
  setShowModal,
}: TambahKategoriModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<TambahKategoriFormSchema> = async (data) => {
    // console.log('form data', data)

    await handleActionWithToast(tambahKategoriBankMateriAction(data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShowModal(false)
        queryClient.invalidateQueries({
          queryKey: ['pengguna.bank-materi.kategori'],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  return (
    <Modal
      title="Tambah Kategori Baru"
      desc="Buat kategori baru untuk menyimpan materi Kamu"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Form<TambahKategoriFormSchema>
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
              <ControlledInput
                name="nama"
                control={control}
                errors={errors}
                label="Nama Kategori"
                placeholder="Tulis nama kategori di sini"
              />

              <FormError error={formError} />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Buat Kategori Baru"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
