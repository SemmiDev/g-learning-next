import { tambahPaketPenggunaAction } from '@/actions/admin/paket-pengguna/tambah'
import {
  CardSeparator,
  ControlledInput,
  ControlledInputRupiah,
  ControlledSelect,
  Form,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
  Text,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { selectOption } from '@/utils/object'
import { required } from '@/utils/validations/pipe'
import { objectRequired } from '@/utils/validations/refine'
import { rupiahToNumber } from '@/utils/validations/transform'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Alert } from 'rizzui'

const formSchema = z.object({
  nama: z.string().pipe(required),
  totalPenyimpanan: z.string().pipe(required).pipe(z.coerce.number()),
  totalPenyimpananUnit: z.any().superRefine(objectRequired),
  limitKelas: z.string().pipe(required).pipe(z.coerce.number()),
  limitAnggotaKelas: z.string().pipe(required).pipe(z.coerce.number()),
  harga: z
    .string()
    .pipe(required)
    .transform(rupiahToNumber)
    .pipe(z.coerce.number()),
})

export type TambahPaketPenggunaFormSchema = {
  nama?: string
  totalPenyimpanan?: number | string
  totalPenyimpananUnit?: SelectOptionType
  limitKelas?: number | string
  limitAnggotaKelas?: number | string
  harga?: number | string
}

const sizeUnitOptions: SelectOptionType[] = [
  selectOption('MB'),
  selectOption('GB'),
  selectOption('TB'),
]

const initialValues: TambahPaketPenggunaFormSchema = {
  totalPenyimpananUnit: selectOption('MB'),
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

  const onSubmit: SubmitHandler<TambahPaketPenggunaFormSchema> = async (
    data
  ) => {
    await handleActionWithToast(tambahPaketPenggunaAction(data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShowModal(false)
        queryClient.invalidateQueries({
          queryKey: ['admin.paket-pengguna.list'],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  return (
    <Modal
      title="Tambah Paket Pengguna"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Form<TambahPaketPenggunaFormSchema>
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
                  defaultValue={sizeUnitOptions[0]}
                  className="w-24 mt-[26px]"
                  classNames={{ control: 'rounded-l-none' }}
                />
              </div>

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
                name="limitAnggotaKelas"
                control={control}
                errors={errors}
                type="number"
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
                label="Harga/bulan"
                placeholder="Harga paket"
                required
              />

              {formError && (
                <Alert size="sm" variant="flat" color="danger">
                  <Text size="sm" weight="medium">
                    {formError}
                  </Text>
                </Alert>
              )}
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
