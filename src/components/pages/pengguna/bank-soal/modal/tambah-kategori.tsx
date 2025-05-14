import {
  ControlledInput,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { tambahKategoriBankSoalApi } from '@/services/api/pengguna/bank-soal/kategori/tambah'
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
  show?: boolean
  setShow(show: boolean): void
}

export default function TambahKategoriModal({
  show = false,
  setShow,
}: TambahKategoriModalProps) {
  const jwt = useSessionJwt()
  const queryClient = useQueryClient()

  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<TambahKategoriFormSchema> = async (data) => {
    await handleActionWithToast(tambahKategoriBankSoalApi(jwt, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShow(false)
        queryClient.invalidateQueries({
          queryKey: ['pengguna.bank-soal.kategori'],
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
    <Modal
      title="Tambah Kategori Baru"
      desc="Buat kategori baru untuk menyimpan paket soal Kamu"
      isOpen={show}
      onClose={handleClose}
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
                required
              />

              <FormError error={formError} />
            </div>

            <ModalFooterButtons
              submit="Buat Kategori Baru"
              submitClassName="text-nowrap"
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
