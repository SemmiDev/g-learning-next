import { tambahPembayaranTagihanInstansiAction } from '@/actions/admin/tagihan-instansi/pembayaran/tambah'
import {
  CardSeparator,
  ControlledDatePicker,
  ControlledInput,
  ControlledInputRupiah,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nomor: z.string().optional(),
  tanggal: z.date(),
  nominal: z.number(),
})

export type TambahPembayaranTagihanInstansiFormSchema = {
  nomor?: string
  tanggal?: Date
  nominal?: number
}

const initialValues: TambahPembayaranTagihanInstansiFormSchema = {}

type TambahModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function TambahModal({
  show = false,
  setShow,
}: TambahModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { id: idTagihan }: { id: string } = useParams()

  const onSubmit: SubmitHandler<
    TambahPembayaranTagihanInstansiFormSchema
  > = async (data) => {
    await handleActionWithToast(
      tambahPembayaranTagihanInstansiAction(idTagihan, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['admin.tagihan-instansi.pembayaran', idTagihan],
          })
          queryClient.invalidateQueries({
            queryKey: ['admin.tagihan-instansi.pembayaran.table', idTagihan],
          })

          setShow(false)
        },
        onError: ({ message }) => setFormError(message),
      }
    )
  }

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Tambah Pembayaran Tagihan Instansi"
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahPembayaranTagihanInstansiFormSchema>
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
                name="nomor"
                control={control}
                errors={errors}
                label={
                  <>
                    Nomor Pembayaran{' '}
                    <small>(Kosongkan untuk nomor otomatis)</small>
                  </>
                }
                placeholder="Masukkan nomor pembayaran"
              />

              <ControlledDatePicker
                name="tanggal"
                control={control}
                errors={errors}
                label="Tanggal Pembayaran"
                placeholder="Masukkan tanggal pembayaran"
                showMonthDropdown
                showYearDropdown
                required
              />

              <ControlledInputRupiah
                name="nominal"
                control={control}
                errors={errors}
                min={0}
                label="Nominal Pembayaran"
                placeholder="Masukkan nominal pembayaran"
                required
              />

              <FormError error={formError} />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Simpan"
              isSubmitting={isSubmitting}
              onCancel={handleClose}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
