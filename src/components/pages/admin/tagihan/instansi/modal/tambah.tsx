import {
  ControlledAsyncPaginateSelect,
  ControlledDatePicker,
  ControlledInput,
  ControlledInputNumber,
  ControlledInputRupiah,
  ControlledSelect,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
} from '@/components/ui'
import { NAMA_BULAN } from '@/config/const'
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { instansiSelectDataApi } from '@/services/api/admin/async-select/instansi'
import { paketInstansiSelectDataApi } from '@/services/api/admin/async-select/paket-instansi'
import { lihatInstansiApi } from '@/services/api/admin/instansi/lihat'
import { tambahTagihanInstansiApi } from '@/services/api/admin/tagihan-instansi/tambah'
import { handleActionWithToast } from '@/utils/action'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nomor: z.string().optional(),
  instansi: z.any().superRefine(objectRequired),
  bulan: z.any().superRefine(objectRequired),
  tahun: z.number(),
  tanggal: z.date(),
  paket: z.any().superRefine(objectRequired),
  nominal: z.number(),
})

export type TambahTagihanInstansiFormSchema = {
  nomor?: string
  instansi?: SelectOptionType
  bulan?: SelectOptionType<number>
  tahun?: number
  tanggal?: Date
  paket?: SelectOptionType
  nominal?: number
}

const bulanOptions: SelectOptionType<number>[] = NAMA_BULAN.map((val, idx) => ({
  label: val,
  value: idx + 1,
}))

const initialValues: TambahTagihanInstansiFormSchema = {
  bulan: bulanOptions[new Date().getMonth()],
  tahun: new Date().getFullYear(),
}

type TambahModalProps = {
  show?: boolean
  setShow(show: boolean): void
}

export default function TambahModal({
  show = false,
  setShow,
}: TambahModalProps) {
  const { jwt } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeMediumModal()

  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<TambahTagihanInstansiFormSchema> = async (
    data
  ) => {
    await handleActionWithToast(tambahTagihanInstansiApi(jwt, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShow(false)
        queryClient.invalidateQueries({
          queryKey: ['admin.tagihan-instansi.table'],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const findPaket = async (idInstansi: string) => {
    const { data } = await lihatInstansiApi(jwt, idInstansi)

    return data?.paket_instansi
  }

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Tambah Tagihan Instansi"
      size={size}
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahTagihanInstansiFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
        flexing
      >
        {({
          control,
          getValues,
          setValue,
          formState: { errors, isSubmitting },
        }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledInput
                name="nomor"
                control={control}
                errors={errors}
                label={
                  <>
                    Nomor Tagihan{' '}
                    <small>(Kosongkan untuk nomor otomatis)</small>
                  </>
                }
                placeholder="Masukkan nomor tagihan"
              />

              <ControlledAsyncPaginateSelect
                name="instansi"
                control={control}
                label="Instansi"
                placeholder="Pilih Instansi"
                action={instansiSelectDataApi}
                construct={(data) => ({
                  label: data.nama,
                  value: data.id,
                })}
                onChange={async (data: SelectOptionType) => {
                  if (!data.value) return

                  const paket = await findPaket(data.value)
                  if (paket?.id) {
                    setValue('paket', {
                      label: paket?.nama || '',
                      value: paket?.id,
                    })
                  }
                  setValue('nominal', paket?.harga)
                }}
                errors={errors}
                required
              />

              <div className="flex gap-2">
                <ControlledSelect
                  name="bulan"
                  control={control}
                  label="Bulan Tagihan"
                  placeholder="Pilih Bulan"
                  options={bulanOptions}
                  errors={errors}
                  className="flex-1"
                  onChange={(val) => {
                    const tahun = getValues('tahun')
                    if (!val || !tahun) return

                    setValue('tanggal', new Date(tahun, val.value - 1, 1))
                  }}
                  required
                />

                <ControlledInputNumber
                  name="tahun"
                  control={control}
                  errors={errors}
                  min={2000}
                  label="Tahun Tagihan"
                  placeholder="Masukkan tahun tagihan"
                  className="flex-1"
                  onChange={(val) => {
                    const bulan = getValues('bulan')
                    if (!val || !bulan) return

                    setValue('tanggal', new Date(val, bulan.value - 1, 1))
                  }}
                  required
                />
              </div>

              <ControlledDatePicker
                name="tanggal"
                control={control}
                errors={errors}
                label="Tanggal Tagihan"
                placeholder="Masukkan tanggal tagihan"
                showMonthDropdown
                showYearDropdown
                required
              />

              <ControlledAsyncPaginateSelect
                name="paket"
                control={control}
                label="Paket Instansi"
                placeholder="Pilih Paket"
                action={paketInstansiSelectDataApi}
                construct={(data) => ({
                  label: data.nama,
                  value: data.id,
                  harga: data.harga,
                })}
                onChange={async (data: SelectOptionType) => {
                  setValue('nominal', data.harga)
                }}
                errors={errors}
                required
              />

              <ControlledInputRupiah
                name="nominal"
                control={control}
                errors={errors}
                min={0}
                label="Nominal Tagihan"
                placeholder="Masukkan nominal tagihan"
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
