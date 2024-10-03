import { tambahPaketPenggunaAction } from '@/actions/admin/paket-pengguna/tambah'
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
  limitKelas: z.number(),
  limitAnggotaKelas: z.number(),
  harga: z.number(),
})

export type TambahPaketPenggunaFormSchema = {
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

const initialValues: TambahPaketPenggunaFormSchema = {
  totalPenyimpananUnit: sizeUnitOptions[0],
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

  const onSubmit: SubmitHandler<TambahPaketPenggunaFormSchema> = async (
    data
  ) => {
    await handleActionWithToast(tambahPaketPenggunaAction(data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShow(false)
        queryClient.invalidateQueries({
          queryKey: ['admin.paket-pengguna.list'],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleClose = () => {
    setShow(false)
    setFormError(undefined)
  }

  return (
    <Modal title="Tambah Paket Pengguna" isOpen={show} onClose={handleClose}>
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
    </Modal>
  )
}
