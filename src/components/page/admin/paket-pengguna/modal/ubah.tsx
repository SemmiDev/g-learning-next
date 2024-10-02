import { lihatPaketPenggunaAction } from '@/actions/admin/paket-pengguna/lihat'
import { ubahPaketPenggunaAction } from '@/actions/admin/paket-pengguna/ubah'
import {
  CardSeparator,
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
import { handleActionWithToast } from '@/utils/action'
import { FILE_SIZE_UNIT_SCALE } from '@/utils/bytes'
import { selectOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const units = ['MB', 'GB', 'TB'] as const
const getSize = (
  megabytes: number
): {
  size: number
  unit: (typeof units)[number]
} => {
  const pow = Math.floor(Math.log(megabytes) / Math.log(FILE_SIZE_UNIT_SCALE))
  const scale = Math.pow(FILE_SIZE_UNIT_SCALE, pow)
  const mod = megabytes % scale

  if (mod === 0) {
    return {
      size: megabytes / scale,
      unit: units[pow],
    }
  }

  return {
    size: megabytes,
    unit: units[0],
  }
}

const formSchema = z.object({
  nama: z.string().pipe(required),
  totalPenyimpanan: z.number(),
  totalPenyimpananUnit: z.any().superRefine(objectRequired),
  limitKelas: z.number(),
  limitAnggotaKelas: z.number(),
  harga: z.number(),
})

export type UbahPaketPenggunaFormSchema = {
  nama?: string
  totalPenyimpanan?: number
  totalPenyimpananUnit?: SelectOptionType
  limitKelas?: number
  limitAnggotaKelas?: number
  harga?: number
}

const sizeUnitOptions: SelectOptionType[] = [
  selectOption('MB'),
  selectOption('GB'),
  selectOption('TB'),
]

type UbahModalProps = {
  id?: string
  setId(id?: string): void
}

export default function UbahModal({ id, setId }: UbahModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const queryKey = ['admin.paket-pengguna.table.ubah', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahPaketPenggunaFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatPaketPenggunaAction(id)

      const { size, unit } = getSize(data?.batas_penyimpanan ?? 0)

      return {
        nama: data?.nama,
        totalPenyimpanan: size,
        totalPenyimpananUnit: selectOption(unit),
        limitKelas: data?.batas_kelas,
        limitAnggotaKelas: data?.batas_anggota_kelas,
        harga: data?.harga,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahPaketPenggunaFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahPaketPenggunaAction(id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['admin.paket-pengguna.list'],
        })
        queryClient.setQueryData(
          queryKey,
          (oldData: UbahPaketPenggunaFormSchema) => ({
            ...oldData,
            ...data,
          })
        )
        setId(undefined)
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setId(undefined)
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ubah Paket Pengguna"
      isLoading={!isLoading && isFetching}
      color="warning"
      isOpen={!!id}
      onClose={handleClose}
    >
      {isLoading || !id ? (
        <Loader height={482} />
      ) : (
        <Form<UbahPaketPenggunaFormSchema>
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
                  name="nama"
                  control={control}
                  errors={errors}
                  label="Nama Paket"
                  placeholder="Nama Paket"
                  required
                />

                <div className="flex">
                  <ControlledInputNumber
                    name="totalPenyimpanan"
                    control={control}
                    errors={errors}
                    min={0}
                    label="Total Penyimpanan"
                    placeholder="Total Penyimpanan"
                    className="flex-1"
                    inputClassName="rounded-r-none"
                    required
                  />

                  <ControlledSelect
                    name="totalPenyimpananUnit"
                    control={control}
                    options={sizeUnitOptions}
                    placeholder="Unit"
                    className="w-24 mt-[26px]"
                    classNames={{ control: 'rounded-l-none' }}
                  />
                </div>

                <ControlledInputNumber
                  name="limitKelas"
                  control={control}
                  errors={errors}
                  min={0}
                  label="Limit Kelas"
                  placeholder="Jumlah maksimal kelas yang bisa dibuka"
                  suffix="Kelas"
                  required
                />

                <ControlledInputNumber
                  name="limitAnggotaKelas"
                  control={control}
                  errors={errors}
                  min={0}
                  label="Limit Anggota Kelas"
                  placeholder="Jumlah maksimal anggota kelas"
                  suffix="Orang"
                  required
                />

                <ControlledInputRupiah
                  name="harga"
                  control={control}
                  errors={errors}
                  min={0}
                  label="Harga/bulan"
                  placeholder="Harga paket"
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
      )}
    </Modal>
  )
}
