import { lihatPaketInstansiAction } from '@/actions/admin/paket-instansi/lihat'
import { ubahPaketInstansiAction } from '@/actions/admin/paket-instansi/ubah'
import {
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
import { useAutoSizeMediumModal } from '@/hooks/auto-size-modal/use-medium-modal'
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
  penyimpananPengajar: z.number(),
  penyimpananPengajarUnit: z.any().superRefine(objectRequired),
  penyimpananPeserta: z.number(),
  penyimpananPesertaUnit: z.any().superRefine(objectRequired),
  limitUser: z.number(),
  limitKelas: z.number(),
  limitKelasPengajar: z.number(),
  harga: z.number(),
})

export type UbahPaketInstansiFormSchema = {
  nama?: string
  totalPenyimpanan?: number
  totalPenyimpananUnit?: SelectOptionType
  penyimpananPengajar?: number
  penyimpananPengajarUnit?: SelectOptionType
  penyimpananPeserta?: number
  penyimpananPesertaUnit?: SelectOptionType
  limitUser?: number
  limitKelas?: number
  limitKelasPengajar?: number
  harga?: number
}

const sizeUnitOptions: SelectOptionType[] = [
  selectOption('MB'),
  selectOption('GB'),
  selectOption('TB'),
]

type UbahModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahModal({ id, show, onHide }: UbahModalProps) {
  const queryClient = useQueryClient()
  const size = useAutoSizeMediumModal()
  const [formError, setFormError] = useState<string>()

  const queryKey = ['admin.paket-instansi.table.ubah', id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahPaketInstansiFormSchema>({
    queryKey,
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
        totalPenyimpanan: totalSize,
        totalPenyimpananUnit: selectOption(totalUnit),
        penyimpananPengajar: pengajarSize,
        penyimpananPengajarUnit: selectOption(pengajarUnit),
        penyimpananPeserta: pesertaSize,
        penyimpananPesertaUnit: selectOption(pesertaUnit),
        limitUser: data?.batas_pengguna,
        limitKelas: data?.batas_kelas,
        limitKelasPengajar: data?.batas_kelas_pengajar,
        harga: data?.harga,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahPaketInstansiFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahPaketInstansiAction(id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['admin.paket-instansi.list'],
        })
        queryClient.setQueryData(
          queryKey,
          (oldData: UbahPaketInstansiFormSchema) => ({
            ...oldData,
            ...data,
          })
        )
        onHide()
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    onHide()
    setFormError(undefined)
  }

  return (
    <Modal
      title="Ubah Paket Instansi"
      isLoading={!isLoading && isFetching}
      color="warning"
      size={size}
      isOpen={show}
      onClose={handleClose}
    >
      {isLoading ? (
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
          flexing
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

                <div className="flex">
                  <ControlledInputNumber
                    name="penyimpananPengajar"
                    control={control}
                    errors={errors}
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
                  <ControlledInputNumber
                    name="penyimpananPeserta"
                    control={control}
                    errors={errors}
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

                <ControlledInputNumber
                  name="limitUser"
                  control={control}
                  errors={errors}
                  min={0}
                  label="Limit User"
                  placeholder="Jumlah maksimal user yang mendaftar"
                  suffix="User"
                  required
                />

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
                  name="limitKelasPengajar"
                  control={control}
                  errors={errors}
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
                  min={0}
                  label="Harga/bulan"
                  placeholder="Harga paket"
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
