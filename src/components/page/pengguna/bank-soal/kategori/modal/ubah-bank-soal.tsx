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
  Text,
  TextBordered,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Alert } from 'rizzui'

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

export type UbahBankSoalFormSchema = {
  judul?: string
  gunakan?: number
  bobotPilihanBenar?: number
  bobotPilihanSalah?: number
  bobotPilihanKosong?: number
  bobotPilihan?: number
  bobotEsai?: number
  deskripsi?: string
  bisaDiubah?: boolean
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
        bobotPilihanBenar: data?.bobot_benar,
        bobotPilihanSalah: data?.bobot_salah,
        bobotPilihanKosong: data?.bobot_kosong,
        bobotPilihan: data?.persentase_pilihan_ganda,
        bobotEsai: data?.persentase_essay,
        deskripsi: data?.deskripsi,
        bisaDiubah: !data?.total_aktifitas,
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

  const bisaDiubah = initialValues?.bisaDiubah

  return (
    <Modal
      title="Ubah Paket Soal"
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
                {!bisaDiubah && (
                  <Alert color="warning" className="break-words">
                    Paket soal yang <b>sudah digunakan</b> pada kelas hanya bisa
                    diubah judul dan deskripsi saja.
                  </Alert>
                )}

                <ControlledInput
                  name="judul"
                  control={control}
                  errors={errors}
                  label="Nama Paket Soal"
                  placeholder="Tulis nama paket soal di sini"
                  required
                />

                {bisaDiubah ? (
                  <>
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
                          Bobot Total Soal Pilihan Ganda{' '}
                          <small>(Dalam Persen)</small>
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
                  </>
                ) : (
                  <>
                    <TextBordered label="Jumlah Soal Pilihan Ganda Digunakan">
                      {initialValues?.gunakan || '0'} Soal
                    </TextBordered>

                    <div className="flex flex-col gap-y-1">
                      <Text size="sm" weight="semibold" variant="dark">
                        Bobot Soal Pilihan Ganda
                      </Text>
                      <div className="flex gap-2">
                        <TextBordered label="Bobot Benar" className="flex-1">
                          {initialValues?.bobotPilihanBenar || '0'}
                        </TextBordered>
                        <TextBordered label="Bobot Salah" className="flex-1">
                          {initialValues?.bobotPilihanSalah || '0'}
                        </TextBordered>
                        <TextBordered label="Bobot Kosong" className="flex-1">
                          {initialValues?.bobotPilihanKosong || '0'}
                        </TextBordered>
                      </div>
                    </div>

                    <TextBordered label="Bobot Total Soal Pilihan Ganda">
                      {initialValues?.bobotPilihan || '0'}%
                    </TextBordered>

                    <TextBordered label="Bobot Total Soal Esai">
                      {initialValues?.bobotEsai || '0'}%
                    </TextBordered>
                  </>
                )}

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
                submit="Simpan"
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
