import { tambahBankSoalAction } from '@/actions/pengguna/bank-soal/tambah'
import {
  CardSeparator,
  ControlledInput,
  ControlledInputNumber,
  ControlledQuillEditor,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const formSchema = z.object({
  judul: z.string().pipe(required),
  gunakan: z.number().min(1),
  bobotBenar: z.number(),
  bobotSalah: z.number(),
  bobotKosong: z.number(),
  deskripsi: z.string().optional(),
})

export type TambahBankSoalFormSchema = {
  judul?: string
  gunakan?: number
  bobotBenar?: number
  bobotSalah?: number
  bobotKosong?: number
  deskripsi?: string
}

const initialValues: TambahBankSoalFormSchema = {
  bobotBenar: 1,
  bobotSalah: 0,
  bobotKosong: 0,
}

type TambahBankSoalModalProps = {
  show: boolean
  setShow(show: boolean): void
}

export default function TambahBankSoalModal({
  show = false,
  setShow,
}: TambahBankSoalModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { kategori: idKategori }: { kategori: string } = useParams()

  const onSubmit: SubmitHandler<TambahBankSoalFormSchema> = async (data) => {
    await handleActionWithToast(tambahBankSoalAction(idKategori, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShow(false)
        queryClient.invalidateQueries({
          queryKey: ['pengguna.bank-soal.list', idKategori],
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
    <Modal
      title="Buat Bank Soal Baru"
      size="lg"
      isOpen={show}
      onClose={handleClose}
    >
      <Form<TambahBankSoalFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{ mode: 'onSubmit', defaultValues: initialValues }}
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledInput
                name="judul"
                control={control}
                errors={errors}
                label="Judul Soal"
                placeholder="Tulis judul soal di sini"
                required
              />

              <ControlledInputNumber
                name="gunakan"
                control={control}
                errors={errors}
                label="Jumlah Soal Digunakan"
                placeholder="Jumlah soal yang akan digunakan dari keseluruhan soal"
                suffix="Soal"
                required
              />

              <div className="grid grid-cols-12 gap-2">
                <ControlledInputNumber
                  name="bobotBenar"
                  control={control}
                  errors={errors}
                  label="Bobot Benar"
                  placeholder="Nilai jawaban benar"
                  className="col-span-12 xs:col-span-4"
                  required
                />
                <ControlledInputNumber
                  name="bobotSalah"
                  control={control}
                  errors={errors}
                  label="Bobot Salah"
                  placeholder="Nilai jawaban salah"
                  className="col-span-12 xs:col-span-4"
                  required
                />
                <ControlledInputNumber
                  name="bobotKosong"
                  control={control}
                  errors={errors}
                  label="Bobot Kosong"
                  placeholder="Nilai jawaban kosong"
                  className="col-span-12 xs:col-span-4"
                  required
                />
              </div>

              <ControlledQuillEditor
                name="deskripsi"
                control={control}
                errors={errors}
                label="Deskripsi"
                placeholder="Buat deskripsi singkat terkait soal"
                toolbar="minimalist"
              />

              <FormError error={formError} />
            </div>

            <CardSeparator />

            <ModalFooterButtons
              submit="Mulai Buat Soal"
              isSubmitting={isSubmitting}
              onCancel={handleClose}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
