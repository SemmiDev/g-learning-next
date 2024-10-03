import { lihatSoalAction } from '@/actions/pengguna/bank-soal/soal/lihat'
import { ubahSoalAction } from '@/actions/pengguna/bank-soal/soal/ubah'
import {
  ActionIcon,
  Button,
  CardSeparator,
  ControlledQuillEditor,
  ControlledRadio,
  Form,
  FormError,
  Label,
  Loader,
  Modal,
  ModalFooterButtons,
  TextLabel,
} from '@/components/ui'
import { PILIHAN_JAWABAN } from '@/config/const'
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

const pilihanLower = PILIHAN_JAWABAN.map(
  (pilihan) =>
    pilihan.toLowerCase() as Lowercase<(typeof PILIHAN_JAWABAN)[number]>
)

const formSchema = z.object({
  soal: z
    .string()
    .transform((val) => cleanQuill(val))
    .pipe(required),
  jawaban: z.array(
    z
      .string()
      .transform((val) => cleanQuill(val))
      .pipe(required)
  ),
  benar: z.string({ required_error: 'Pilihan jawaban wajib dipilih' }),
})

export type UbahSoalFormSchema = {
  soal?: string
  jawaban: string[]
  benar?: string
}

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
          jawaban: [],
        }

      const { data } = await lihatSoalAction(idBankSoal, id)

      const pilihanJawaban = pilihanLower.map(
        (pilihan) => data?.[`jawaban_${pilihan}`].teks ?? ''
      )

      const maxPilihan = pilihanJawaban.findIndex((pilihan) => !pilihan)

      return {
        soal: data?.pertanyaan,
        jawaban: pilihanJawaban.slice(
          0,
          maxPilihan >= 0 ? maxPilihan : undefined
        ),
        benar: data?.jawaban_benar,
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
      title="Ubah Soal"
      isLoading={!isLoading && isFetching}
      color="warning"
      size="xl"
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
            setValue,
            formState: { errors, isSubmitting },
          }) => (
            <>
              <div className="flex flex-col gap-4 p-3">
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

                <div className="space-y-2">
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
