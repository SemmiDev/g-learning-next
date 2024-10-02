import { instansiSelectDataAction } from '@/actions/admin/async-select/instansi'
import { tambahPembayaranInstansiAction } from '@/actions/admin/pembayaran-instansi/tambah'
import {
  CardSeparator,
  ControlledAsyncPaginateSelect,
  ControlledDatePicker,
  ControlledInput,
  ControlledInputRupiah,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  pesanan: z.string().optional(),
  instansi: z.any().superRefine(objectRequired),
  tanggal: z.date(),
  nominal: z.number(),
})

export type TambahPembayaranInstansiFormSchema = {
  pesanan?: string
  instansi?: SelectOptionType
  tanggal?: Date
  nominal?: number
}

const initialValues: TambahPembayaranInstansiFormSchema = {}

type TambahModalProps = {
  showModal?: boolean
  setShowModal(show: boolean): void
}

export default function TambahModal({
  showModal = false,
  setShowModal,
}: TambahModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<TambahPembayaranInstansiFormSchema> = async (
    data
  ) => {
    await handleActionWithToast(tambahPembayaranInstansiAction(data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShowModal(false)
        queryClient.invalidateQueries({
          queryKey: ['admin.pembayaran-instansi.table'],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setShowModal(false)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Tambah Pembayaran Instansi"
      isOpen={showModal}
      onClose={handleClose}
      overflow
    >
      <Form<TambahPembayaranInstansiFormSchema>
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
                name="pesanan"
                control={control}
                errors={errors}
                label="Nomor Pesanan"
                placeholder="Masukkan nomor pesanan"
              />

              <ControlledAsyncPaginateSelect
                name="instansi"
                control={control}
                label="Instansi"
                placeholder="Pilih Instansi"
                action={instansiSelectDataAction}
                construct={(data) => ({
                  label: data.nama,
                  value: data.id,
                })}
                errors={errors}
                required
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
