import {
  ContentLoader,
  ControlledDatePicker,
  ControlledInput,
  ControlledInputRupiah,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatPembayaranTagihanInstansiApi } from '@/services/api/admin/tagihan-instansi/pembayaran/lihat'
import { ubahPembayaranTagihanInstansiApi } from '@/services/api/admin/tagihan-instansi/pembayaran/ubah'
import { handleActionWithToast } from '@/utils/action'
import { parseDate } from '@/utils/date'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nomor: z.string(),
  tanggal: z.date(),
  nominal: z.number(),
})

export type UbahPembayaranTagihanInstansiFormSchema = {
  nomor?: string
  tanggal?: Date
  nominal?: number
}

type UbahModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahModal({ id, show, onHide }: UbahModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()

  const [formError, setFormError] = useState<string>()

  const { id: idTagihan }: { id: string } = useParams()

  const queryKey = [
    'admin.tagihan-instansi.pembayaran.table.ubah',
    idTagihan,
    id,
  ]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahPembayaranTagihanInstansiFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await processApi(
        lihatPembayaranTagihanInstansiApi,
        idTagihan,
        id
      )

      return {
        nomor: data?.nomor_pembayaran,
        tanggal: parseDate(data?.tanggal_pembayaran),
        nominal: data?.jumlah_pembayaran,
      }
    },
  })

  const onSubmit: SubmitHandler<
    UbahPembayaranTagihanInstansiFormSchema
  > = async (data) => {
    if (!id) return

    await handleActionWithToast(
      processApi(ubahPembayaranTagihanInstansiApi, idTagihan, id, data),
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
          queryClient.setQueryData(
            queryKey,
            (oldData: UbahPembayaranTagihanInstansiFormSchema) => ({
              ...oldData,
              ...data,
            })
          )
          onHide()
        },
        onError: ({ message }) => setFormError(message),
      }
    )
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ubah Pembayaran Tagihan Instansi"
      isLoading={!isLoading && isFetching}
      color="warning"
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      {isLoading ? (
        <ContentLoader height={318} />
      ) : (
        <Form<UbahPembayaranTagihanInstansiFormSchema>
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
                <ControlledInput
                  name="nomor"
                  control={control}
                  errors={errors}
                  label="Nomor Pembayaran"
                  placeholder="Masukkan nomor pembayaran"
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
