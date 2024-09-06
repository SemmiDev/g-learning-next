import { tambahPaketInstansiAction } from '@/actions/admin/paket-instansi/tambah'
import {
  CardSeparator,
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
import { handleActionWithToast } from '@/utils/action'
import { selectOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

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

export type TambahPaketInstansiFormSchema = {
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

const initialValues: TambahPaketInstansiFormSchema = {
  totalPenyimpananUnit: sizeUnitOptions[0],
  penyimpananPesertaUnit: sizeUnitOptions[0],
  penyimpananPengajarUnit: sizeUnitOptions[0],
}

export default function TambahModal({
  showModal = false,
  setShowModal,
}: {
  showModal?: boolean
  setShowModal(show: boolean): void
}) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const onSubmit: SubmitHandler<TambahPaketInstansiFormSchema> = async (
    data
  ) => {
    await handleActionWithToast(tambahPaketInstansiAction(data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShowModal(false)
        queryClient.invalidateQueries({
          queryKey: ['admin.paket-instansi.list'],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  return (
    <Modal
      title="Tambah Paket Instansi"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Form<TambahPaketInstansiFormSchema>
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

            <CardSeparator />

            <ModalFooterButtons
              submit="Simpan"
              isSubmitting={isSubmitting}
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
