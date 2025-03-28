import { paketPenggunaSelectDataAction } from '@/actions/admin/async-select/paket-pengguna'
import { penggunaAktifSelectDataAction } from '@/actions/admin/async-select/pengguna-aktif'
import { lihatDetailPaketPenggunaAction } from '@/actions/admin/paket-pengguna/lihat-detail-pengguna'
import { tambahTagihanPenggunaAction } from '@/actions/admin/tagihan-pengguna/tambah'
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
import { handleActionWithToast } from '@/utils/action'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nomor: z.string().optional(),
  pengguna: z.any().superRefine(objectRequired),
  bulan: z.any().superRefine(objectRequired),
  tahun: z.number(),
  tanggal: z.date(),
  paket: z.any().superRefine(objectRequired),
  nominal: z.number(),
})

export type TambahTagihanPenggunaFormSchema = {
  nomor?: string
  pengguna?: SelectOptionType
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

const initialValues: TambahTagihanPenggunaFormSchema = {
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
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<TambahTagihanPenggunaFormSchema> = async (
    data
  ) => {
    await handleActionWithToast(tambahTagihanPenggunaAction(data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShow(false)
        queryClient.invalidateQueries({
          queryKey: ['admin.tagihan-pengguna.table'],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const findPaket = async (idPengguna: string) => {
    const { data } = await lihatDetailPaketPenggunaAction(idPengguna)

    return data
  }

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Tambah Tagihan Pengguna"
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      <Form<TambahTagihanPenggunaFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{
          mode: 'onSubmit',
          defaultValues: initialValues,
        }}
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
                name="pengguna"
                control={control}
                label="Pengguna"
                placeholder="Pilih Pengguna"
                action={penggunaAktifSelectDataAction}
                construct={(data) => ({
                  label: data.nama,
                  value: data.id,
                })}
                onChange={async (data: SelectOptionType) => {
                  if (!data.value) return

                  const paket = await findPaket(data.value)
                  if (paket?.id && paket.tipe === 'Custom') {
                    setValue('paket', {
                      label: paket?.nama || '',
                      value: paket?.id,
                    })
                    setValue('nominal', paket?.harga)
                  }
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
                label="Paket Pengguna"
                placeholder="Pilih Paket"
                action={paketPenggunaSelectDataAction}
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
