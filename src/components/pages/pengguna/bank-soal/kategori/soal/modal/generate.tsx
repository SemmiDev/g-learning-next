import {
  ControlledInputNumber,
  ControlledMateri,
  ControlledPustakaMedia,
  ControlledSelect,
  ControlledSwitch,
  Form,
  FormError,
  MateriItemType,
  Modal,
  ModalFooterButtons,
  PustakaMediaFileType,
  SelectOptionType,
  Text,
} from '@/components/ui'
import { useAutoSizeLargeModal } from '@/hooks/auto-size-modal/use-large-modal'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { generateSoalApi } from '@/services/api/pengguna/bank-soal/soal/generate'
import { handleActionWithToast } from '@/utils/action'
import { z } from '@/utils/zod-id'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { Alert } from 'rizzui'

const formSchema = z
  .object({
    jumlahPilihan: z.number().min(0),
    opsiPilihan: z.any().optional(),
    jumlahEsai: z.number().min(0),
    bobotEsai: z.number().min(1).optional(),
    bahasa: z.any().optional(),
    usingMateri: z.boolean(),
    materi: z.any().optional(),
    pustakaMedia: z.array(z.any()),
  })
  .refine(
    (data) =>
      (!!data.jumlahPilihan && !!data.opsiPilihan) || !data.jumlahPilihan,
    {
      message: 'Wajib dipilih.',
      path: ['opsiPilihan'],
    }
  )
  .refine(
    (data) => (!!data.jumlahEsai && !!data.bobotEsai) || !data.jumlahEsai,
    {
      message: 'Wajib diisi.',
      path: ['bobotEsai'],
    }
  )
  .refine((data) => !data.usingMateri || (data.usingMateri && !!data.materi), {
    message: 'Materi media wajib dipilih',
    path: ['materi'],
  })
  .refine(
    (data) =>
      data.usingMateri || (!data.usingMateri && data.pustakaMedia.length > 0),
    {
      message: 'Pustaka media wajib dipilih',
      path: ['pustakaMedia'],
    }
  )

export type GenerateSoalFormSchema = {
  jumlahPilihan: number
  opsiPilihan?: SelectOptionType
  jumlahEsai: number
  bobotEsai?: number
  bahasa?: SelectOptionType
  usingMateri?: boolean
  materi?: MateriItemType
  pustakaMedia?: PustakaMediaFileType[]
}

const opsiPilihanOptions: SelectOptionType<number>[] = [
  { label: '3 (A, B, C)', value: 3 },
  { label: '4 (A, B, C, D)', value: 4 },
  { label: '5 (A, B, C, D, E)', value: 5 },
]

const bahasaOptions: SelectOptionType[] = [
  { label: 'Indonesia', value: 'Indonesia' },
  { label: 'Inggris', value: 'English' },
]

const initialValues: GenerateSoalFormSchema = {
  jumlahPilihan: 0,
  jumlahEsai: 0,
  bahasa: bahasaOptions[0],
  usingMateri: false,
  pustakaMedia: [],
}

type GenerateSoalModalProps = {
  show?: boolean
  setShow(show: boolean): void
  refetchKey: QueryKey
}

export default function GenerateSoalModal({
  show = false,
  setShow,
  refetchKey,
}: GenerateSoalModalProps) {
  const { processApi } = useSessionJwt()
  const queryClient = useQueryClient()
  const size = useAutoSizeLargeModal()

  const [formError, setFormError] = useState<string>()

  const { soal: idBankSoal }: { kategori: string; soal: string } = useParams()

  const onSubmit: SubmitHandler<GenerateSoalFormSchema> = async (data) => {
    await handleActionWithToast(processApi(generateSoalApi, idBankSoal, data), {
      loading: 'Membuat soal...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: refetchKey })
        setShow(false)
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
      title="Generate Soal"
      size={size}
      isOpen={show}
      onClose={handleClose}
    >
      <Form<GenerateSoalFormSchema>
        onSubmit={onSubmit}
        validationSchema={formSchema}
        useFormProps={{ mode: 'onSubmit', defaultValues: initialValues }}
        flexing
      >
        {({ control, watch, formState: { errors, isSubmitting } }) => (
          <>
            <div className="flex flex-col gap-4 p-3">
              <Alert color="info">
                <Text size="sm" weight="semibold">
                  Fitur generate soal ini menggunakan teknologi AI. Gunakan
                  fitur ini dengan bijak.
                  <br />
                  Periksalah kembali soal yang sudah dibuat sebelum digunakan.
                </Text>
              </Alert>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ControlledSelect
                  name="bahasa"
                  control={control}
                  options={bahasaOptions}
                  label="Buat Soal Dalam Bahasa"
                  placeholder="Pilih Bahasa"
                  errors={errors}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ControlledInputNumber
                  name="jumlahPilihan"
                  control={control}
                  label="Jumlah Soal Pilihan Ganda"
                  placeholder="Jumlah soal pilihan ganda yg ingin dibuat"
                  min={0}
                  errors={errors}
                  stepper
                  required
                />

                {(watch('jumlahPilihan') || 0) > 0 && (
                  <ControlledSelect
                    name="opsiPilihan"
                    control={control}
                    options={opsiPilihanOptions}
                    label="Opsi Pilihan Ganda"
                    placeholder="Pilih Opsi Pilihan Ganda"
                    errors={errors}
                    required
                  />
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ControlledInputNumber
                  name="jumlahEsai"
                  control={control}
                  label="Jumlah Soal Esai"
                  placeholder="Jumlah soal esai yg ingin dibuat"
                  min={0}
                  errors={errors}
                  stepper
                  required
                />

                {(watch('jumlahEsai') || 0) > 0 && (
                  <ControlledInputNumber
                    name="bobotEsai"
                    control={control}
                    label="Bobot Soal Esai"
                    placeholder="Masukkan bobot soal esai di sini"
                    min={1}
                    errors={errors}
                    required
                  />
                )}
              </div>

              <div>
                <ControlledSwitch
                  name="usingMateri"
                  control={control}
                  label="Gunakan Materi Sebagai Referensi"
                />

                {watch('usingMateri') ? (
                  <ControlledMateri
                    name="materi"
                    control={control}
                    errors={errors}
                    type="materi"
                  >
                    <Text size="sm" className="pustaka-media-label">
                      Klik di sini untuk memilih referensi dari bank materi
                      <br />
                      <small className="font-semibold">
                        (hanya mendukung format berkas docx, pdf dan pptx)
                      </small>
                    </Text>
                  </ControlledMateri>
                ) : (
                  <ControlledPustakaMedia
                    name="pustakaMedia"
                    control={control}
                    errors={errors}
                    multiple
                  >
                    <Text size="sm" className="pustaka-media-label">
                      Klik di sini untuk memilih referensi dari pustaka media
                      <br />
                      <small className="font-semibold">
                        (hanya mendukung format berkas docx, pdf dan pptx)
                      </small>
                    </Text>
                  </ControlledPustakaMedia>
                )}
              </div>

              <FormError error={formError} />
            </div>

            <ModalFooterButtons
              submit="Buat Soal"
              isSubmitting={isSubmitting}
              onCancel={handleClose}
              disabled={!watch('jumlahPilihan') && !watch('jumlahEsai')}
              borderTop
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
