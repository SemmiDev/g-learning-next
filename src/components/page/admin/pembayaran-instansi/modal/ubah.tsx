import { lihatPembayaranInstansiAction } from '@/actions/admin/pembayaran-instansi/lihat'
import { ubahPembayaranInstansiAction } from '@/actions/admin/pembayaran-instansi/ubah'
import {
  CardSeparator,
  ControlledDatePicker,
  ControlledInputRupiah,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  TextBordered,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { rupiah } from '@/utils/text'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  tanggal: z.date(),
  nominal: z.number(),
})

export type UbahPembayaranInstansiFormSchema = {
  pesanan?: string
  instansi?: string
  nominalTerbayar?: number
  tanggal?: Date
  nominal?: number
}

type UbahModalProps = {
  id?: string
  setId(id?: string): void
}

export default function UbahModal({ id, setId }: UbahModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahPembayaranInstansiFormSchema>({
    queryKey: ['admin.pembayaran-instansi.table.ubah', id],
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatPembayaranInstansiAction(id)

      return {
        pesanan: data?.nomor_pesanan,
        instansi: data?.nama_instansi,
        nominalTerbayar: data?.nominal,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahPembayaranInstansiFormSchema> = async (
    data
  ) => {
    if (!id) return

    await handleActionWithToast(ubahPembayaranInstansiAction(id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setId(undefined)
        queryClient.invalidateQueries({
          queryKey: ['admin.pembayaran-instansi.table'],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  return (
    <Modal
      title="Ubah Pembayaran Instansi"
      isLoading={!isLoading && isFetching}
      color="warning"
      isOpen={!!id}
      onClose={() => setId(undefined)}
      overflow
    >
      {isLoading || !id ? (
        <Loader height={336} />
      ) : (
        <Form<UbahPembayaranInstansiFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
          }}
        >
          {({ control, formState: { errors, isSubmitting } }) => (
            <>
              <div className="flex flex-col gap-4 p-3">
                <TextBordered label="No. Pesanan">
                  {initialValues?.pesanan}
                </TextBordered>

                <TextBordered label="Instansi">
                  {initialValues?.instansi}
                </TextBordered>

                <TextBordered label="Nominal Terbayar">
                  {rupiah(initialValues?.nominalTerbayar || 0)}
                </TextBordered>

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
                submitColor="warning"
                isSubmitting={isSubmitting}
                onCancel={() => setId(undefined)}
              />
            </>
          )}
        </Form>
      )}
    </Modal>
  )
}
