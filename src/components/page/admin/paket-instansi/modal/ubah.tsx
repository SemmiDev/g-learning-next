import { lihatPaketInstansiAction } from '@/actions/admin/paket-instansi/lihat'
import { ubahPaketInstansiAction } from '@/actions/admin/paket-instansi/ubah'
import {
  CardSeparator,
  ControlledInput,
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
import { inputToNumber } from '@/utils/validations/transform'
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
  totalPenyimpanan: z.string().pipe(required).pipe(z.coerce.number()),
  totalPenyimpananUnit: z.any().superRefine(objectRequired),
  penyimpananPengajar: z.string().pipe(required).pipe(z.coerce.number()),
  penyimpananPengajarUnit: z.any().superRefine(objectRequired),
  penyimpananPeserta: z.string().pipe(required).pipe(z.coerce.number()),
  penyimpananPesertaUnit: z.any().superRefine(objectRequired),
  limitUser: z.string().pipe(required).pipe(z.coerce.number()),
  limitKelas: z.string().pipe(required).pipe(z.coerce.number()),
  limitKelasPengajar: z.string().pipe(required).pipe(z.coerce.number()),
  harga: z
    .string()
    .pipe(required)
    .transform(inputToNumber)
    .pipe(z.coerce.number()),
})

export type UbahPaketInstansiFormSchema = {
  nama?: string
  totalPenyimpanan?: number | string
  totalPenyimpananUnit?: SelectOptionType
  penyimpananPengajar?: number | string
  penyimpananPengajarUnit?: SelectOptionType
  penyimpananPeserta?: number | string
  penyimpananPesertaUnit?: SelectOptionType
  limitUser?: number | string
  limitKelas?: number | string
  limitKelasPengajar?: number | string
  harga?: number | string
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

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahPaketInstansiFormSchema>({
    queryKey: ['admin.paket-instansi.table.ubah', id],
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatPaketInstansiAction(id)

      const { size: totalSize, unit: totalUnit } = getSize(
        data?.batas_penyimpanan ?? 0
      )
      const { size: pengajarSize, unit: pengajarUnit } = getSize(
        data?.batas_penyimpanan_pengajar ?? 0
      )
      const { size: pesertaSize, unit: pesertaUnit } = getSize(
        data?.batas_penyimpanan_peserta ?? 0
      )

      return {
        nama: data?.nama,
        totalPenyimpanan: totalSize + '',
        totalPenyimpananUnit: selectOption(totalUnit),
        penyimpananPengajar: pengajarSize + '',
        penyimpananPengajarUnit: selectOption(pengajarUnit),
        penyimpananPeserta: pesertaSize + '',
        penyimpananPesertaUnit: selectOption(pesertaUnit),
        limitUser: data?.batas_pengguna + '',
        limitKelas: data?.batas_kelas + '',
        limitKelasPengajar: data?.batas_kelas_pengajar + '',
        harga: data?.harga + '',
      }
    },
  })

  const onSubmit: SubmitHandler<UbahPaketInstansiFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahPaketInstansiAction(id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setId(undefined)
        queryClient.invalidateQueries({
          queryKey: ['admin.paket-instansi.list'],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  return (
    <Modal
      title="Ubah Paket Instansi"
      isLoading={!isLoading && isFetching}
      color="warning"
      isOpen={!!id}
      onClose={() => setId(undefined)}
    >
      {isLoading || !id ? (
        <Loader height={482} />
      ) : (
        <Form<UbahPaketInstansiFormSchema>
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
                  <ControlledInput
                    name="totalPenyimpanan"
                    control={control}
                    errors={errors}
                    type="number"
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

                <div className="flex">
                  <ControlledInput
                    name="penyimpananPengajar"
                    control={control}
                    errors={errors}
                    type="number"
                    min={0}
                    label="Limit Penyimpanan Pengajar"
                    placeholder="Limit Penyimpanan Pengajar"
                    className="flex-1"
                    inputClassName="rounded-r-none"
                    required
                  />
                  <ControlledSelect
                    name="penyimpananPengajarUnit"
                    control={control}
                    options={sizeUnitOptions}
                    placeholder="Unit"
                    className="w-24 mt-[26px]"
                    classNames={{ control: 'rounded-l-none' }}
                  />
                </div>

                <div className="flex">
                  <ControlledInput
                    name="penyimpananPeserta"
                    control={control}
                    errors={errors}
                    type="number"
                    min={0}
                    label="Limit Penyimpanan Peserta"
                    placeholder="Limit Penyimpanan Peserta"
                    className="flex-1"
                    inputClassName="rounded-r-none"
                    required
                  />
                  <ControlledSelect
                    name="penyimpananPesertaUnit"
                    control={control}
                    options={sizeUnitOptions}
                    placeholder="Unit"
                    className="w-24 mt-[26px]"
                    classNames={{ control: 'rounded-l-none' }}
                  />
                </div>

                <ControlledInput
                  name="limitUser"
                  control={control}
                  errors={errors}
                  type="number"
                  min={0}
                  label="Limit User"
                  placeholder="Jumlah maksimal user yang mendaftar"
                  suffix="User"
                  required
                />

                <ControlledInput
                  name="limitKelas"
                  control={control}
                  errors={errors}
                  type="number"
                  min={0}
                  label="Limit Kelas"
                  placeholder="Jumlah maksimal kelas yang bisa dibuka"
                  suffix="Kelas"
                  required
                />

                <ControlledInput
                  name="limitKelasPengajar"
                  control={control}
                  errors={errors}
                  type="number"
                  min={0}
                  label="Limit Kelas/pengajar"
                  placeholder="Jumlah default maksimal kelas yang bisa dibuka oleh pengajar"
                  suffix="Kelas"
                  required
                />

                <ControlledInputRupiah
                  name="harga"
                  control={control}
                  errors={errors}
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
                onCancel={() => setId(undefined)}
              />
            </>
          )}
        </Form>
      )}
    </Modal>
  )
}
