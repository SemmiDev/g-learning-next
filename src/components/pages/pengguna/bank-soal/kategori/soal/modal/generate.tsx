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
import { objectRequired } from '@/utils/validations/refine'
import { z } from '@/utils/zod-id'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

const baseFs = z.object({
  jumlahPilihan: z.number().min(0),
  opsiPilihan: z.any().superRefine(objectRequired),
  jumlahEsai: z.number().min(0),
  bobotEsai: z.number().min(1),
})

const materiFs = z.object({
  usingMateri: z.literal(true),
  materi: z.any().superRefine(objectRequired),
})

const pustakaMediaFs = z.object({
  usingMateri: z.literal(false),
  pustakaMedia: z
    .array(z.any())
    .refine((val) => val.length > 0, 'Pustaka media wajib dipilih'),
})

const formSchema = z.union([
  baseFs.merge(materiFs),
  baseFs.merge(pustakaMediaFs),
])

export type GenerateSoalFormSchema = {
  jumlahPilihan?: number
  opsiPilihan?: SelectOptionType
  jumlahEsai?: number
  bobotEsai?: number
  usingMateri?: boolean
  materi?: MateriItemType
  pustakaMedia?: PustakaMediaFileType[]
}

const opsiPilihanOptions: SelectOptionType<number>[] = [
  { label: '3 (A, B, C)', value: 3 },
  { label: '4 (A, B, C, D)', value: 4 },
  { label: '5 (A, B, C, D, E)', value: 5 },
]

const initialValues: GenerateSoalFormSchema = {}

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
    if (!idBankSoal) return

    console.log(data)

    // await handleActionWithToast(
    //   processApi(generateSoalApi, idBankSoal, id, data),
    //   {
    //     loading: 'Menyimpan...',
    //     onStart: () => setFormError(undefined),
    //     onSuccess: () => {
    //       queryClient.invalidateQueries({ queryKey: refetchKey })
    //       setShow(false)
    //     },
    //     onError: ({ message }) => setFormError(message),
    //   }
    // )
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ControlledInputNumber
                  name="jumlahPilihan"
                  control={control}
                  label="Jumlah Soal Pilihan Ganda"
                  placeholder="Jumlah soal pilihan ganda yg ingin dibuat"
                  min={0}
                  errors={errors}
                  required
                />

                <ControlledSelect
                  name="opsiPilihan"
                  control={control}
                  options={opsiPilihanOptions}
                  label="Opsi Pilihan Ganda"
                  placeholder="Pilih Opsi Pilihan Ganda"
                  errors={errors}
                  required
                />

                <ControlledInputNumber
                  name="jumlahEsai"
                  control={control}
                  label="Jumlah Soal Esai"
                  placeholder="Jumlah soal esai yg ingin dibuat"
                  min={0}
                  errors={errors}
                  required
                />

                <ControlledInputNumber
                  name="bobotEsai"
                  control={control}
                  label="Bobot Soal Esai"
                  placeholder="Masukkan bobot soal esai di sini"
                  min={0}
                  errors={errors}
                  required
                />
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
              borderTop
            />
          </>
        )}
      </Form>
    </Modal>
  )
}
