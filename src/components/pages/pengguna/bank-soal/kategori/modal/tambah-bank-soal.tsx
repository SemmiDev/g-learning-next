import {
  ControlledInput,
  ControlledInputNumber,
  ControlledQuillEditor,
  Form,
  FormError,
  Modal,
  ModalFooterButtons,
  Text,
} from '@/components/ui'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { tambahBankSoalApi } from '@/services/api/pengguna/bank-soal/tambah'
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
  bobotPilihanBenar: z.number(),
  bobotPilihanSalah: z.number(),
  bobotPilihanKosong: z.number(),
  bobotPilihan: z.number().min(0).max(100),
  bobotEsai: z.number().min(0).max(100),
  deskripsi: z.string().optional(),
})

export type TambahBankSoalFormSchema = {
  judul?: string
  gunakan?: number
  bobotPilihanBenar?: number
  bobotPilihanSalah?: number
  bobotPilihanKosong?: number
  bobotPilihan?: number
  bobotEsai?: number
  deskripsi?: string
}

const initialValues: TambahBankSoalFormSchema = {
  bobotPilihanBenar: 1,
  bobotPilihanSalah: 0,
  bobotPilihanKosong: 0,
}

type TambahBankSoalModalProps = {
  show: boolean
  setShow(show: boolean): void
}

export default function TambahBankSoalModal({
  show = false,
  setShow,
}: TambahBankSoalModalProps) {
  const jwt = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()

  const [formError, setFormError] = useState<string>()

  const { kategori: idKategori }: { kategori: string } = useParams()

  const onSubmit: SubmitHandler<TambahBankSoalFormSchema> = async (data) => {
    await handleActionWithToast(tambahBankSoalApi(jwt, idKategori, data), {
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
      title="Buat Paket Soal Baru"
      size={size}
      isOpen={show}
      onClose={handleClose}
    >
      <Form<TambahBankSoalFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{ mode: 'onSubmit', defaultValues: initialValues }}
        flexing
      >
        {({ control, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <ControlledInput
                name="judul"
                control={control}
                errors={errors}
                label="Nama Paket Soal"
                placeholder="Tulis nama paket soal di sini"
                required
              />

              <ControlledInputNumber
                name="gunakan"
                control={control}
                errors={errors}
                label="Jumlah Soal Pilihan Ganda Digunakan"
                placeholder="Jumlah soal yang akan digunakan dari keseluruhan soal"
                suffix="Soal"
                required
              />

              <div className="flex flex-col gap-y-1">
                <Text size="sm" weight="semibold" variant="dark">
                  Bobot Soal Pilihan Ganda
                </Text>

                <div className="grid grid-cols-12 gap-2">
                  <ControlledInputNumber
                    name="bobotPilihanBenar"
                    control={control}
                    errors={errors}
                    label="Bobot Benar"
                    placeholder="Bobot nilai jawaban benar"
                    className="col-span-12 xs:col-span-4"
                    required
                  />
                  <ControlledInputNumber
                    name="bobotPilihanSalah"
                    control={control}
                    errors={errors}
                    label="Bobot Salah"
                    placeholder="Bobot nilai jawaban salah"
                    className="col-span-12 xs:col-span-4"
                    required
                  />
                  <ControlledInputNumber
                    name="bobotPilihanKosong"
                    control={control}
                    errors={errors}
                    label="Bobot Kosong"
                    placeholder="Nilai jawaban kosong"
                    className="col-span-12 xs:col-span-4"
                    required
                  />
                </div>
              </div>

              <ControlledInputNumber
                name="bobotPilihan"
                control={control}
                errors={errors}
                label={
                  <>
                    Bobot Total Soal Pilihan Ganda <small>(Dalam Persen)</small>
                  </>
                }
                placeholder="Bobot nilai dalam persen total soal pilihan ganda"
                min={0}
                max={100}
                suffix="%"
                required
              />

              <ControlledInputNumber
                name="bobotEsai"
                control={control}
                errors={errors}
                label={
                  <>
                    Bobot Total Soal Esai <small>(Dalam Persen)</small>
                  </>
                }
                placeholder="Bobot nilai dalam persen total soal esai"
                min={0}
                max={100}
                suffix="%"
                required
              />

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

            <ModalFooterButtons
              submit="Mulai Buat Soal"
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
