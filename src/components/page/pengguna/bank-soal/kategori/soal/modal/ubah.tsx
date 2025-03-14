import { lihatSoalAction } from '@/actions/pengguna/bank-soal/soal/lihat'
import { ubahSoalAction } from '@/actions/pengguna/bank-soal/soal/ubah'
import {
  ActionIcon,
  Button,
  CardSeparator,
  ControlledInputNumber,
  ControlledQuillEditor,
  ControlledRadio,
  Form,
  FormError,
  Label,
  Loader,
  Modal,
  ModalFooterButtons,
  SelectOptionType,
  TextBordered,
  TextLabel,
} from '@/components/ui'
import { PILIHAN_JAWABAN } from '@/config/const'
import { useAutoSizeExtraLargeModal } from '@/hooks/auto-size-modal/use-extra-large-modal'
import { handleActionWithToast } from '@/utils/action'
import { removeIndexFromList } from '@/utils/list'
import { cleanQuill } from '@/utils/string'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BsPlus, BsTrash } from 'react-icons/bs'
import { FieldError } from 'rizzui'

const TipeSoal = {
  'single-choice': 'Pilihan Ganda',
  essay: 'Esai',
}

export type TipeSoalType = keyof typeof TipeSoal

type JawabanType = (typeof PILIHAN_JAWABAN)[number]

const pilihanLower = PILIHAN_JAWABAN.map(
  (pilihan) => pilihan.toLowerCase() as Lowercase<JawabanType>
)

const baseFs = z.object({
  soal: z
    .string()
    .transform((val) => cleanQuill(val))
    .pipe(required),
})

const isSingleChoice = z
  .object({
    tipe: z.object({ label: z.string(), value: z.literal('single-choice') }),
    jawaban: z.array(
      z
        .string()
        .transform((val) => cleanQuill(val))
        .pipe(required)
    ),
    benar: z.string({ required_error: 'Pilihan jawaban wajib dipilih' }),
  })
  .merge(baseFs)

const isEssay = z
  .object({
    tipe: z.object({ label: z.string(), value: z.literal('essay') }),
    jawaban: z.array(z.string()),
    bobot: z.number().min(0),
  })
  .merge(baseFs)

const formSchema = z.union([isSingleChoice, isEssay])

export type UbahSoalFormSchema = {
  tipe: SelectOptionType
  soal?: string
  jawaban: string[]
  benar?: string
  bobot?: number
}

const tipeOptions: SelectOptionType[] = [
  { label: TipeSoal['single-choice'], value: 'single-choice' },
  { label: TipeSoal.essay, value: 'essay' },
]

type UbahSoalModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function UbahSoalModal({
  id,
  show,
  onHide,
}: UbahSoalModalProps) {
  const queryClient = useQueryClient()
  const size = useAutoSizeExtraLargeModal()
  const [formError, setFormError] = useState<string>()

  const {
    kategori: idKategori,
    soal: idBankSoal,
  }: { kategori: string; soal: string } = useParams()

  const queryKey = ['pengguna.bank-soal.soal.ubah', idBankSoal, id]

  const {
    data: initialValues,
    isLoading,
    isFetching,
  } = useQuery<UbahSoalFormSchema>({
    queryKey,
    queryFn: async () => {
      if (!id)
        return {
          tipe: tipeOptions[0],
          jawaban: [],
        }

      const { data } = await lihatSoalAction(idBankSoal, id)

      const pilihanJawaban = pilihanLower.map(
        (pilihan) => data?.[`jawaban_${pilihan}`]?.teks ?? ''
      )

      const maxPilihan = pilihanJawaban.findIndex((pilihan) => !pilihan)

      return {
        tipe: data?.tipe === 'PILIHAN_GANDA' ? tipeOptions[0] : tipeOptions[1],
        soal: data?.pertanyaan,
        jawaban: pilihanJawaban.slice(
          0,
          maxPilihan >= 0 ? maxPilihan : undefined
        ),
        benar: data?.jawaban_benar,
        bobot: data?.bobot_essay ?? undefined,
      }
    },
  })

  const onSubmit: SubmitHandler<UbahSoalFormSchema> = async (data) => {
    if (!id) return

    await handleActionWithToast(ubahSoalAction(idBankSoal, id, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['pengguna.bank-soal.soal.list', idKategori, idBankSoal],
        })
        queryClient.setQueryData(queryKey, (oldData: UbahSoalFormSchema) => ({
          ...oldData,
          ...data,
        }))
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
      title={`Ubah Soal (${initialValues?.tipe.label})`}
      isLoading={!isLoading && isFetching}
      color="warning"
      size={size}
      isOpen={show}
      onClose={handleClose}
    >
      {isLoading ? (
        <Loader height={447} />
      ) : (
        <Form<UbahSoalFormSchema>
          onSubmit={onSubmit}
          validationSchema={formSchema}
          useFormProps={{
            mode: 'onSubmit',
            defaultValues: initialValues,
            values: initialValues,
          }}
        >
          {({
            control,
            watch,
            getValues,
            setValue,
            formState: { errors, isSubmitting },
          }) => (
            <>
              <div className="flex flex-col gap-4 p-3">
                {getValues('tipe').value === 'essay' && (
                  <ControlledInputNumber
                    name="bobot"
                    control={control}
                    label="Bobot Soal"
                    placeholder="Masukkan bobot soal di sini"
                    min={0}
                    errors={errors}
                    required
                  />
                )}

                <ControlledQuillEditor
                  name="soal"
                  control={control}
                  errors={errors}
                  toolbar="normal-image"
                  size="sm"
                  label="Soal"
                  placeholder="Deskripsi soal"
                  className="text-gray-dark"
                  noMaxHeight
                  required
                />

                {getValues('tipe').value === 'single-choice' && (
                  <div className="flex flex-col gap-y-2">
                    <div>
                      <TextLabel>
                        <Label label="Pilihan Jawaban" required />
                      </TextLabel>
                      {errors.benar?.message && (
                        <FieldError size="md" error={errors.benar?.message} />
                      )}
                    </div>
                    {watch('jawaban')?.map((_, idx) => (
                      <div className="flex items-center gap-2" key={idx}>
                        <ControlledRadio
                          name="benar"
                          control={control}
                          value={PILIHAN_JAWABAN[idx]}
                        />
                        <ControlledQuillEditor
                          name={`jawaban.${idx}`}
                          control={control}
                          placeholder="Deskripsi jawaban"
                          toolbar="minimalist-image"
                          size="xs"
                          className="flex-1 text-gray-dark"
                          error={errors.jawaban?.[idx]?.message}
                          noMaxHeight
                        />
                        {watch('jawaban').length > 3 && (
                          <ActionIcon
                            size="sm"
                            variant="outline"
                            color="danger"
                            className="hover:border-danger-lighter"
                            onClick={() => {
                              if (watch('jawaban').length <= 3) return

                              setValue(
                                'jawaban',
                                removeIndexFromList(watch('jawaban'), idx)
                              )
                            }}
                          >
                            <BsTrash />
                          </ActionIcon>
                        )}
                      </div>
                    ))}

                    {watch('jawaban').length < PILIHAN_JAWABAN.length && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (watch('jawaban').length >= PILIHAN_JAWABAN.length)
                            return

                          setValue('jawaban', [...watch('jawaban'), ''])
                        }}
                      >
                        <BsPlus size={20} className="mr-2" />
                        Tambah Pilihan Jawaban
                      </Button>
                    )}
                  </div>
                )}

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
