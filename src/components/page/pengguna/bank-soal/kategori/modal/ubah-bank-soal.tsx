import { lihatBankSoalAction } from '@/actions/pengguna/bank-soal/lihat'
import { ubahBankSoalAction } from '@/actions/pengguna/bank-soal/ubah'
import {
  CardSeparator,
  ControlledInput,
  ControlledInputNumber,
  ControlledQuillEditor,
  Form,
  FormError,
  Loader,
  Modal,
  ModalFooterButtons,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
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

export type UbahBankSoalFormSchema = {
  judul?: string
  gunakan?: number
  bobotBenar?: number
  bobotSalah?: number
  bobotKosong?: number
  deskripsi?: string
}

type UbahBankSoalModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahBankSoalModal({
  id,
  show,
  onHide,
}: UbahBankSoalModalProps) {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()

  const { kategori: idKategori }: { kategori: string } = useParams()

  const queryKey = ['pengguna.bank-soal.ubah', idKategori, id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahBankSoalFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id) return {}

      const { data } = await lihatBankSoalAction(idKategori, id)

      return {
        judul: data?.judul,
        gunakan: data?.jumlah_soal_yang_digunakan,
        bobotBenar: data?.bobot_benar,
        bobotSalah: data?.bobot_salah,
        bobotKosong: data?.bobot_kosong,
        deskripsi: data?.deskripsi,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahBankSoalFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahBankSoalAction(idKategori, id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['pengguna.bank-soal.list', idKategori],
        })
        queryClient.invalidateQueries({
          queryKey: ['pengguna.bank-soal.lihat', idKategori, id],
        })
        queryClient.setQueryData(
          queryKey,
          (oldData: UbahBankSoalFormSchema) => ({
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
      title="Ubah Bank Soal"
      isLoading={!isLoading && isFetching}
      color="warning"
      size="lg"
      isOpen={show}
      onClose={handleClose}
    >
      {isLoading ? (
        <Loader height={447} />
      ) : (
        <Form<UbahBankSoalFormSchema>
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

                <div className="flex gap-2">
                  <ControlledInputNumber
                    name="bobotBenar"
                    control={control}
                    errors={errors}
                    label="Bobot Benar"
                    placeholder="Nilai jawaban benar"
                    className="flex-1"
                    required
                  />
                  <ControlledInputNumber
                    name="bobotSalah"
                    control={control}
                    errors={errors}
                    label="Bobot Salah"
                    placeholder="Nilai jawaban salah"
                    className="flex-1"
                    required
                  />
                  <ControlledInputNumber
                    name="bobotKosong"
                    control={control}
                    errors={errors}
                    label="Bobot Kosong"
                    placeholder="Nilai jawaban kosong"
                    className="flex-1"
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
                submit="Simpan Soal"
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
