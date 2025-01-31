'use client'

import {
  ActionIcon,
  ActionIconTooltip,
  Button,
  Card,
  CardSeparator,
  ControlledInputNumber,
  ControlledQuillEditor,
  ControlledRadio,
  ControlledSelect,
  Form,
  FormError,
  Label,
  ModalConfirm,
  SelectOptionType,
  Text,
  TextLabel,
  Title,
} from '@/components/ui'
import ButtonSubmit from '@/components/ui/button/submit'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { PILIHAN_JAWABAN } from '@/config/const'
import { removeIndexFromList } from '@/utils/list'
import { cleanQuill } from '@/utils/string'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { createRef, RefObject, useMemo, useRef, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BiCircle } from 'react-icons/bi'
import { BsPencil, BsPlus, BsTrash } from 'react-icons/bs'
import { Alert, FieldError } from 'rizzui'
import ImportSoalModal from './modal/import'
import NomorSoal from './nomor-soal'

const TipeSoal = {
  'multiple-choice': 'Pilihan Ganda',
  essay: 'Esai',
}

export type TipeSoalType = keyof typeof TipeSoal

type JawabanType = (typeof PILIHAN_JAWABAN)[number]
export type SoalType = {
  soal: string
  tipe: TipeSoalType
  jawaban?: string[]
  jawabanBenar?: JawabanType
  bobot?: number
}

const pilihanLower = PILIHAN_JAWABAN.map(
  (pilihan) => pilihan.toLowerCase() as Lowercase<JawabanType>
)

const baseFs = z.object({
  soal: z
    .string()
    .transform((val) => cleanQuill(val))
    .pipe(required),
})

const isMultipleChoice = z
  .object({
    tipe: z.object({ label: z.string(), value: z.literal('multiple-choice') }),
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
    bobot: z.number({ required_error: 'Bobot wajib diisi' }),
  })
  .merge(baseFs)

const formSchema = z.union([isMultipleChoice, isEssay])

export type TambahSoalFormSchema = {
  tipe: SelectOptionType
  soal?: string
  jawaban: string[]
  benar?: string
  bobot?: number
}

const tipeOptions: SelectOptionType[] = [
  { label: TipeSoal['multiple-choice'], value: 'multiple-choice' },
  { label: TipeSoal.essay, value: 'essay' },
]

const initialValues: TambahSoalFormSchema = {
  jawaban: ['', '', ''],
  tipe: tipeOptions[0],
}

const canBeChanged = true

export default function KelolaSoalBody() {
  const [tipeSoal, setTipeSoal] = useState<TipeSoalType>(
    initialValues.tipe.value as TipeSoalType
  )
  const [formError, setFormError] = useState<string>()
  const [showModalImport, setShowModalImport] = useState(false)
  const [resetValues, setResetValues] = useState<TambahSoalFormSchema>()
  const [idHapus, setIdHapus] = useState<string>()

  const soalBaruRef = useRef<HTMLDivElement>(null)

  const onSubmit: SubmitHandler<TambahSoalFormSchema> = async (data) => {
    console.log('form data', data)

    setResetValues({
      tipe: data.tipe,
      soal: undefined,
      jawaban: data.jawaban.map(() => ''),
      benar: undefined,
    })
  }

  const listSoalPilihan: SoalType[] = [...Array(20)].map((_, idx) => ({
    tipe: 'multiple-choice',
    soal: '<p>hjabsd <b>asjkd</b> hjbs</p>',
    jawaban: pilihanLower.map(() => '<p>etref <b>xss</b> wwqa</p>'),
    jawabanBenar: 'A',
  }))

  const listSoalEsai: SoalType[] = [...Array(5)].map((_, idx) => ({
    tipe: 'essay',
    soal: '<p>buatlah karangan bebas anda</p>',
  }))

  const listSoal = useMemo(
    () => (tipeSoal === 'multiple-choice' ? listSoalPilihan : listSoalEsai),
    [listSoalPilihan, listSoalEsai]
  )

  const listAllSoal = useMemo(
    () => [...listSoalPilihan, ...listSoalEsai],
    [listSoalPilihan, listSoalEsai]
  )

  const soalRef = useMemo(
    () => listAllSoal.map(() => createRef() as RefObject<HTMLDivElement>),
    [listAllSoal]
  )

  return (
    <>
      <div className="flex flex-col-reverse items-center gap-4 lg:flex-row lg:items-start">
        <div className="flex flex-col gap-4 w-full">
          {canBeChanged ? (
            <Card
              ref={soalBaruRef}
              className="flex flex-col scroll-m-20 lg:scroll-m-24 p-0"
            >
              <Form<TambahSoalFormSchema>
                onSubmit={onSubmit}
                validationSchema={formSchema}
                resetValues={resetValues}
                useFormProps={{
                  mode: 'onSubmit',
                  defaultValues: initialValues,
                }}
              >
                {({
                  control,
                  watch,
                  setValue,
                  clearErrors,
                  formState: { errors, isSubmitting },
                }) => (
                  <>
                    <div className="flex justify-between items-center space-x-2 p-2">
                      <Title as="h6" weight="semibold">
                        Soal Nomor {listSoal.length + 1} ({TipeSoal[tipeSoal]})
                      </Title>
                      {canBeChanged && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowModalImport(true)}
                          >
                            Import Soal
                          </Button>
                          <ButtonSubmit size="sm" isSubmitting={isSubmitting}>
                            Tambah Soal
                          </ButtonSubmit>
                        </div>
                      )}
                    </div>
                    <CardSeparator />
                    <div className="flex flex-col space-y-3 p-2">
                      <FormError error={formError} />

                      <ControlledSelect
                        name="tipe"
                        control={control}
                        options={tipeOptions}
                        label="Tipe Soal"
                        placeholder="Pilih Tipe Soal"
                        errors={errors}
                        onChange={(val) => {
                          setTipeSoal(val.value as TipeSoalType)
                          clearErrors()
                        }}
                      />

                      {watch('tipe').value === 'essay' && (
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
                        size="md"
                        label="Soal"
                        placeholder="Deskripsi soal"
                        className="text-gray-dark"
                        noMaxHeight
                        required
                      />

                      {watch('tipe').value === 'multiple-choice' && (
                        <div className="space-y-2">
                          <div>
                            <TextLabel>
                              <Label label="Pilihan Jawaban" required />
                            </TextLabel>
                            {errors.benar?.message && (
                              <FieldError
                                size="md"
                                error={errors.benar?.message}
                              />
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
                                size="sm"
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
                                if (
                                  watch('jawaban').length >=
                                  PILIHAN_JAWABAN.length
                                )
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
                    </div>
                  </>
                )}
              </Form>
            </Card>
          ) : (
            <Alert color="warning" className="break-words">
              Bank soal yang <b>sudah digunakan</b> pada kelas tidak dapat
              diubah lagi. Jika ingin membuat{' '}
              <b>bank soal dengan variasi berbeda</b>, bisa dilakukan dengan
              membuat duplikat dari bank soal yang sudah dibuat sebelumnya.
            </Alert>
          )}

          {[listSoalPilihan, listSoalEsai].map((listSoal) =>
            listSoal.map((soal, idx) => (
              <Card
                ref={
                  soal.tipe === 'essay'
                    ? soalRef[listSoalPilihan.length + idx]
                    : soalRef[idx]
                }
                key={`pilihan.${idx}`}
                className="flex flex-col scroll-m-20 lg:scroll-m-24 p-0"
              >
                <div className="flex justify-between items-center space-x-2 p-2">
                  <Title as="h6" weight="semibold">
                    Soal Nomor {idx + 1} ({TipeSoal[soal.tipe]})
                  </Title>
                  {canBeChanged && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" color="warning">
                        <BsPencil className="mr-1" />
                        <span>
                          Ubah <span className="hidden xs:inline">Soal</span>
                        </span>
                      </Button>
                      <Button size="sm" variant="outline" color="danger">
                        <BsTrash className="mr-1" />
                        <span>
                          Hapus <span className="hidden xs:inline">Soal</span>
                        </span>
                      </Button>
                    </div>
                  )}
                </div>
                <CardSeparator />
                <div className="flex flex-col space-y-3 text-gray-dark p-2">
                  <SanitizeHTML html={soal.soal} className="font-medium" />
                  {soal.tipe === 'multiple-choice' && (
                    <div className="flex flex-col space-y-2">
                      {PILIHAN_JAWABAN.map((pilihan, pilihanIdx) => {
                        const jawaban = soal.jawaban?.[pilihanIdx]

                        if (!jawaban) return null

                        return (
                          <div
                            key={`pilihan.${idx}.${pilihan}`}
                            className="flex space-x-1 items-center"
                          >
                            <div className="relative">
                              <Text size="sm" weight="bold">
                                {pilihan}.{' '}
                              </Text>
                              {pilihan === soal.jawabanBenar && (
                                <BiCircle
                                  size={23}
                                  className="absolute top-1/2 left-[5.5px] transform -translate-x-1/2 -translate-y-1/2 text-primary stroke-2"
                                />
                              )}
                            </div>
                            <SanitizeHTML
                              html={jawaban}
                              className="font-medium"
                            />
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
        <Card className="flex flex-col w-full p-0 lg:w-4/12 lg:sticky lg:right-0 lg:top-24">
          <div className="flex flex-col p-2">
            <div className="flex justify-between space-x-2">
              <Title as="h6" weight="semibold">
                Judul Soal
              </Title>
              <ActionIconTooltip
                tooltip="Ubah"
                size="sm"
                variant="text-colorful"
                color="warning"
              >
                <BsPencil className="size-3" />
              </ActionIconTooltip>
            </div>
            <SanitizeHTML
              html="Deskripsi singkatnya di sini"
              className="text-sm font-medium text-gray-lighter"
            />
          </div>
          <CardSeparator />
          <NomorSoal
            canBeChanged={canBeChanged}
            tipeSoal={tipeSoal}
            listSoalPilihan={listSoalPilihan}
            listSoalEsai={listSoalEsai}
            listSoal={listSoal}
            soalRef={soalRef}
            soalBaruRef={soalBaruRef}
          />
        </Card>
      </div>

      {canBeChanged && (
        <>
          <ImportSoalModal
            showModal={showModalImport}
            setShowModal={setShowModalImport}
          />

          <ModalConfirm
            title="Hapus Soal"
            desc="Apakah Anda yakin ingin menghapus soal ini?"
            color="danger"
            isOpen={!!idHapus}
            onClose={() => setIdHapus(undefined)}
            onConfirm={() => setIdHapus(undefined)}
            headerIcon="help"
            closeOnCancel
          />
        </>
      )}
    </>
  )
}
