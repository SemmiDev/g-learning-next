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

export type TambahSoalFormSchema = {
  judul?: string
  gunakan?: number
  bobotBenar?: number
  bobotSalah?: number
  bobotKosong?: number
  deskripsi?: string
}

const initialValues: TambahSoalFormSchema = {
  bobotBenar: 1,
  bobotSalah: 0,
  bobotKosong: 0,
}

type TambahSoalModalProps = {
  showModal?: boolean
  setShowModal(show: boolean): void
}

export default function TambahSoalModal({
  showModal = false,
  setShowModal,
}: TambahSoalModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { kategori: idKategori }: { kategori: string } = useParams()

  const onSubmit: SubmitHandler<TambahSoalFormSchema> = async (data) => {
    await handleActionWithToast(tambahBankSoalAction(idKategori, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        setShowModal(false)
        queryClient.invalidateQueries({
          queryKey: ['pengguna.bank-soal.list', idKategori],
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  return (
    <Modal
      title="Buat Bank Soal Baru"
      size="lg"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Form<TambahSoalFormSchema>
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
              />

              <ControlledInputNumber
                name="gunakan"
                control={control}
                errors={errors}
                label="Jumlah Soal Digunakan"
                placeholder="Jumlah soal yang akan digunakan dari keseluruhan soal"
                suffix="Soal"
              />

              <div className="flex gap-2">
                <ControlledInputNumber
                  name="bobotBenar"
                  control={control}
                  errors={errors}
                  label="Bobot Benar"
                  placeholder="Nilai jawaban benar"
                  className="flex-1"
                />
                <ControlledInputNumber
                  name="bobotSalah"
                  control={control}
                  errors={errors}
                  label="Bobot Salah"
                  placeholder="Nilai jawaban salah"
                  className="flex-1"
                />
                <ControlledInputNumber
                  name="bobotKosong"
                  control={control}
                  errors={errors}
                  label="Bobot Kosong"
                  placeholder="Nilai jawaban kosong"
                  className="flex-1"
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
              onCancel={() => setShowModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
