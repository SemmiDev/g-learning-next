import { paketPenggunaSelectDataAction } from '@/actions/admin/async-select/paket-pengguna'
import { penggunaAktifSelectDataAction } from '@/actions/admin/async-select/pengguna-aktif'
import { lihatDetailPaketPenggunaAction } from '@/actions/admin/paket-pengguna/lihat-detail-pengguna'
import { lihatTagihanPenggunaAction } from '@/actions/admin/tagihan-pengguna/lihat'
import { ubahTagihanPenggunaAction } from '@/actions/admin/tagihan-pengguna/ubah'
import {
  CardSeparator,
  ControlledAsyncPaginateSelect,
  ControlledDatePicker,
  ControlledInput,
  ControlledInputNumber,
  ControlledInputRupiah,
  ControlledSelect,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
} from '@/components/ui'
import { NAMA_BULAN } from '@/config/const'
import { handleActionWithToast } from '@/utils/action'
import { parseDate } from '@/utils/date'
import { processData } from '@/utils/process-data'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  nomor: z.string(),
  pengguna: z.any().superRefine(objectRequired),
  bulan: z.any().superRefine(objectRequired),
  tahun: z.number(),
  tanggal: z.date(),
  paket: z.any().superRefine(objectRequired),
  nominal: z.number(),
})

export type UbahTagihanPenggunaFormSchema = {
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

type UbahModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahModal({ id, show, onHide }: UbahModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const queryKey = ['admin.tagihan-pengguna.table.ubah', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahTagihanPenggunaFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatTagihanPenggunaAction(id)

      return {
        pengguna: processData(
          data?.id_pengguna,
          (val) => ({
            label: data?.nama_pengguna || '',
            value: val,
          }),
          undefined
        ),
        nomor: data?.nomor_invoice,
        bulan: processData(
          data?.bulan_tagihan,
          (val) => bulanOptions[val - 1],
          undefined
        ),
        tahun: data?.tahun_tagihan,
        tanggal: parseDate(data?.tanggal_tagihan),
        paket: processData(
          data?.id_paket_pengguna,
          (val) => ({
            label: data?.nama_paket || '',
            value: val,
          }),
          undefined
        ),
        nominal: data?.total_tagihan,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahTagihanPenggunaFormSchema> = async (
    data
  ) => {
    if (!id) return

    await handleActionWithToast(ubahTagihanPenggunaAction(id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['admin.tagihan-pengguna.table'],
        })
        queryClient.setQueryData(
          queryKey,
          (oldData: UbahTagihanPenggunaFormSchema) => ({
            ...oldData,
            ...data,
          })
        )
        onHide()
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const findPaket = async (idPengguna: string) => {
    const { data } = await lihatDetailPaketPenggunaAction(idPengguna)

    return data
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ubah Tagihan Pengguna"
      isLoading={!isLoading && isFetching}
      color="warning"
      isOpen={show}
      onClose={handleClose}
      overflow
    >
      {isLoading ? (
        <Loader height={336} />
      ) : (
        <Form<UbahTagihanPenggunaFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
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
                  label="Nomor Tagihan"
                  placeholder="Masukkan nomor tagihan"
                  required
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

              <CardSeparator />

              <ModalFooterButtons
                submit="Simpan"
                submitColor="warning"
                isSubmitting={isSubmitting}
                onCancel={handleClose}
              />
            </>
          )}
        </Form>
      )}
    </Modal>
  )
}
