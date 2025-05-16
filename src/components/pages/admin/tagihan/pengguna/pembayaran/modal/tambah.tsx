import {
  ControlledDatePicker,
  ControlledInput,
  ControlledInputRupiah,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { tambahPembayaranTagihanPenggunaApi } from '@/services/api/admin/tagihan-pengguna/pembayaran/tambah'
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

export type TambahPembayaranTagihanPenggunaFormSchema = {
  nomor?: string
  tanggal?: Date
  nominal?: number
}

const initialValues: TambahPembayaranTagihanPenggunaFormSchema = {}

type TambahModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function TambahModal({
  show = false,
  setShow,
}: TambahModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()

  const [formError, setFormError] = useState<string>()

  const { id: idTagihan }: { id: string } = useParams()

  const onSubmit: SubmitHandler<
    TambahPembayaranTagihanPenggunaFormSchema
  > = async (data) => {
    await handleActionWithToast(
      processApi(tambahPembayaranTagihanPenggunaApi, idTagihan, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['admin.tagihan-pengguna.pembayaran', idTagihan],
          })
          queryClient.invalidateQueries({
            queryKey: ['admin.tagihan-pengguna.pembayaran.table', idTagihan],
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
      title="Tambah Pembayaran Tagihan Pengguna"
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahPembayaranTagihanPenggunaFormSchema>
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
