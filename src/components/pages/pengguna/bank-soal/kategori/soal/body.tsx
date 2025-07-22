'use client'

import {
  ActionIcon,
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
  Shimmer,
  Text,
  TextLabel,
  Title,
} from '@/components/ui'
import ButtonSubmit from '@/components/ui/button/submit'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { PILIHAN_JAWABAN } from '@/config/const'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { lihatBankSoalApi } from '@/services/api/pengguna/bank-soal/lihat'
import { hapusSoalApi } from '@/services/api/pengguna/bank-soal/soal/hapus'
import { listSoalApi } from '@/services/api/pengguna/bank-soal/soal/list'
import { tambahSoalApi } from '@/services/api/pengguna/bank-soal/soal/tambah'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { removeIndexFromList } from '@/utils/list'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createRef, RefObject, useMemo, useRef, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BiCircle } from 'react-icons/bi'
import {
  BsLayoutTextWindowReverse,
  BsPencil,
  BsPlus,
  BsThreeDots,
  BsTrash,
} from 'react-icons/bs'
import { Alert, Dropdown, FieldError } from 'rizzui'
import UbahBankSoalModal from '../modal/ubah-bank-soal'
import GenerateSoalModal from './modal/generate'
import ImportSoalModal from './modal/import'
import UbahSoalModal from './modal/ubah'
import NomorSoal from './nomor-soal'

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
    bobot: z.number().min(1),
  })
  .merge(baseFs)

const formSchema = z.union([isSingleChoice, isEssay])

export type TambahSoalFormSchema = {
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

const initialValues: TambahSoalFormSchema = {
  jawaban: ['', '', ''],
  tipe: tipeOptions[0],
}

export default function KelolaSoalBody() {
  const { jwt, makeSimpleApiQueryData, processApi } = useSessionJwt()
  const queryClient = useQueryClient()

  const [tipeSoal, setTipeSoal] = useState<TipeSoalType>(
    initialValues.tipe.value as TipeSoalType
  )
  const [formError, setFormError] = useState<string>()
  const {
    show: showUbahPaket,
    key: keyUbahPaket,
    doShow: doShowUbahPaket,
    doHide: doHideUbahPaket,
  } = useShowModal<string>()
  const [showImport, setShowImport] = useState(false)
  const [showGenerate, setShowGenerate] = useState(false)
  const [resetValues, setResetValues] = useState<TambahSoalFormSchema>()
  const {
    show: showUbah,
    key: keyUbah,
    doShow: doShowUbah,
    doHide: doHideUbah,
  } = useShowModal<string>()
  const [idHapus, setIdHapus] = useState<string>()

  const soalBaruRef = useRef<HTMLDivElement>(null)

  const {
    kategori: idKategori,
    soal: idBankSoal,
  }: { kategori: string; soal: string } = useParams()

  const { data: dataBankSoal } = useQuery({
    queryKey: ['pengguna.bank-soal.lihat', idKategori, idBankSoal],
    queryFn: makeSimpleApiQueryData(lihatBankSoalApi, idKategori, idBankSoal),
  })

  const queryKey = ['pengguna.bank-soal.soal.list', idKategori, idBankSoal]

  const queryKeyPilihan = [...queryKey, 'single-choice']
  const { data: listSoalPilihan = [], isLoading: isLoadingPilihan } = useQuery({
    queryKey: queryKeyPilihan,
    queryFn: async () => {
      const { data } = await listSoalApi(jwt, idBankSoal, 'single-choice')

      return data?.list ?? []
    },
  })

  const queryKeyEsai = [...queryKey, 'essay']
  const { data: listSoalEsai = [], isLoading: isLoadingEsai } = useQuery({
    queryKey: queryKeyEsai,
    queryFn: async () => {
      const { data } = await listSoalApi(jwt, idBankSoal, 'essay')

      return data?.list ?? []
    },
  })

  const nomorSoalBaru = useMemo(
    () =>
      (tipeSoal === 'single-choice' ? listSoalPilihan : listSoalEsai).length +
      1,
    [tipeSoal, listSoalPilihan, listSoalEsai]
  )

  const listAllSoal = useMemo(
    () => [...listSoalPilihan, ...listSoalEsai],
    [listSoalPilihan, listSoalEsai]
  )

  const soalRef = useMemo(
    () => listAllSoal.map(() => createRef() as RefObject<HTMLDivElement>),
    [listAllSoal]
  )

  const onSubmit: SubmitHandler<TambahSoalFormSchema> = async (data) => {
    await handleActionWithToast(processApi(tambahSoalApi, idBankSoal, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey })
        setResetValues({
          tipe: data.tipe,
          soal: undefined,
          jawaban: data.jawaban.map(() => ''),
          benar: undefined,
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleHapus = async () => {
    if (!idHapus) return

    await handleActionWithToast(processApi(hapusSoalApi, idBankSoal, idHapus), {
      loading: 'Menghapus...',
      onSuccess: () => {
        setIdHapus(undefined)
        queryClient.setQueryData(
          queryKeyPilihan,
          (oldData: typeof listSoalPilihan) =>
            oldData.filter((item) => item.id !== idHapus)
        )
        queryClient.setQueryData(queryKeyEsai, (oldData: typeof listSoalEsai) =>
          oldData.filter((item) => item.id !== idHapus)
        )
        queryClient.invalidateQueries({ queryKey })
      },
    })
  }

  const canBeChanged = !dataBankSoal?.total_aktifitas

  const isLoading = isLoadingPilihan || isLoadingEsai

  return (
    <>
      <BodyShimmer className={!isLoading ? 'hidden' : ''} />

      <div
        className={cn(
          'flex flex-col-reverse items-center gap-4 lg:flex-row lg:items-start',
          {
            hidden: isLoading,
          }
        )}
      >
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
                    <div className="flex justify-between items-center gap-x-2 gap-y-1 flex-wrap p-2">
                      <Title as="h6" weight="semibold">
                        Soal Nomor {nomorSoalBaru} ({TipeSoal[tipeSoal]})
                      </Title>
                      {canBeChanged && (
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowImport(true)}
                          >
                            Import Soal
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowGenerate(true)}
                          >
                            Generate Soal
                          </Button>
                          <ButtonSubmit size="sm" isSubmitting={isSubmitting}>
                            Tambah Soal
                          </ButtonSubmit>
                        </div>
                      )}
                    </div>
                    <CardSeparator />
                    <div className="flex flex-col gap-y-3 p-2">
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
                        required
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

                      {watch('tipe').value === 'single-choice' && (
                        <div className="flex flex-col gap-y-2">
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
              Paket soal yang <b>sudah digunakan</b> pada kelas tidak dapat
              diubah lagi. Jika ingin membuat{' '}
              <b>paket soal dengan variasi berbeda</b>, bisa dilakukan dengan
              membuat duplikat dari paket soal yang sudah dibuat sebelumnya.
            </Alert>
          )}

          {[listSoalPilihan, listSoalEsai].map((listSoal) =>
            listSoal.map((soal, idx) => (
              <Card
                ref={
                  soal.tipe === 'ESSAY'
                    ? soalRef[listSoalPilihan.length + idx]
                    : soalRef[idx]
                }
                key={`pilihan.${idx}`}
                className="flex flex-col scroll-m-20 lg:scroll-m-24 p-0"
              >
                <div className="flex justify-between items-center gap-x-2 p-2">
                  <Title as="h6" weight="semibold">
                    Soal Nomor {idx + 1} (
                    {
                      TipeSoal[
                        soal.tipe === 'ESSAY' ? 'essay' : 'single-choice'
                      ]
                    }
                    )
                    {soal.tipe === 'ESSAY' && (
                      <>
                        {' '}
                        -{' '}
                        <small className="font-bold">
                          Bobot Soal: {soal.bobot_essay}
                        </small>
                      </>
                    )}
                  </Title>
                  {canBeChanged && (
                    <div className="flex gap-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        color="warning"
                        onClick={() => doShowUbah(soal.id)}
                      >
                        <BsPencil className="mr-1" />
                        <span>
                          Ubah <span className="hidden xs:inline">Soal</span>
                        </span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        color="danger"
                        onClick={() => setIdHapus(soal.id)}
                      >
                        <BsTrash className="mr-1" />
                        <span>
                          Hapus <span className="hidden xs:inline">Soal</span>
                        </span>
                      </Button>
                    </div>
                  )}
                </div>
                <CardSeparator />
                <div className="flex flex-col gap-y-3 text-gray-dark p-2">
                  <SanitizeHTML
                    html={soal.pertanyaan}
                    className="font-medium"
                  />
                  {soal.tipe !== 'ESSAY' && (
                    <div className="flex flex-col gap-y-2">
                      {PILIHAN_JAWABAN.map((pilihan) => {
                        const jawaban =
                          soal[
                            `jawaban_${mustBe(
                              pilihan.toLowerCase(),
                              pilihanLower,
                              'a'
                            )}`
                          ].teks
                        if (!jawaban) return null

                        return (
                          <div
                            key={`${soal.id}.${pilihan}`}
                            className="flex gap-x-1 items-center"
                          >
                            <div className="relative">
                              <Text size="sm" weight="bold">
                                {pilihan}.{' '}
                              </Text>
                              {pilihan === soal.jawaban_benar && (
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
            <div className="flex justify-between items-center gap-x-2">
              <Title as="h6" weight="semibold">
                {dataBankSoal?.judul ?? ''}
              </Title>
              <Dropdown placement="bottom-end">
                <Dropdown.Trigger>
                  <ActionIcon as="span" size="sm" variant="text">
                    <BsThreeDots className="size-3" />
                  </ActionIcon>
                </Dropdown.Trigger>
                <Dropdown.Menu className="w-auto divide-y !py-0">
                  <div className="py-2">
                    <Dropdown.Item
                      className="text-gray-dark"
                      onClick={() => {
                        if (!dataBankSoal?.id) return

                        doShowUbahPaket(dataBankSoal?.id)
                      }}
                    >
                      <BsPencil className="text-warning size-4 mr-2" />
                      Ubah
                    </Dropdown.Item>
                    <Link
                      href={`${routes.pengguna.bankSoal}/${idKategori}/soal/${idBankSoal}/preview`}
                    >
                      <Dropdown.Item className="text-gray-dark">
                        <BsLayoutTextWindowReverse className="text-primary size-4 mr-2" />
                        Preview
                      </Dropdown.Item>
                    </Link>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              {/* <ActionIconTooltip
                tooltip="Ubah"
                size="sm"
                variant="text-colorful"
                color="warning"
                onClick={() => {
                  if (!dataBankSoal?.id) return

                  doShowUbahPaket(dataBankSoal?.id)
                }}
              >
                <BsPencil className="size-3" />
              </ActionIconTooltip> */}
            </div>
            <SanitizeHTML
              html={dataBankSoal?.deskripsi || '-'}
              className="text-sm font-medium text-gray-lighter"
            />
          </div>
          <CardSeparator />
          <NomorSoal
            canBeChanged={canBeChanged}
            tipeSoal={tipeSoal}
            listSoalPilihan={listSoalPilihan}
            listSoalEsai={listSoalEsai}
            soalRef={soalRef}
            soalBaruRef={soalBaruRef}
          />
        </Card>
      </div>

      <UbahBankSoalModal
        show={showUbahPaket}
        id={keyUbahPaket}
        onHide={doHideUbahPaket}
      />

      {canBeChanged && (
        <>
          <ImportSoalModal
            show={showImport}
            setShow={setShowImport}
            refetchKey={queryKey}
          />

          <GenerateSoalModal
            show={showGenerate}
            setShow={setShowGenerate}
            refetchKey={queryKey}
          />

          <UbahSoalModal show={showUbah} id={keyUbah} onHide={doHideUbah} />

          <ModalConfirm
            title="Hapus Soal"
            desc="Apakah Anda yakin ingin menghapus soal ini?"
            color="danger"
            isOpen={!!idHapus}
            onClose={() => setIdHapus(undefined)}
            onConfirm={handleHapus}
            headerIcon="help"
            closeOnCancel
          />
        </>
      )}
    </>
  )
}

function BodyShimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse items-center gap-4 lg:flex-row lg:items-start',
        className
      )}
    >
      <div className="flex flex-col gap-4 w-full">
        <Card className="p-0">
          <div className="flex items-center justify-between gap-x-2 p-2">
            <Shimmer className="h-4 w-3/12" />
            <div className="flex gap-x-2 w-48">
              <Shimmer className="h-8 flex-1" />
              <Shimmer className="h-8 flex-1" />
              <Shimmer className="h-8 flex-1" />
            </div>
          </div>
          <CardSeparator />
          <div className="flex flex-col gap-y-3 p-2">
            <div className="flex flex-col gap-y-1.5">
              <Shimmer className="h-3 w-16 my-1" />
              <Shimmer className="h-10 w-full" />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <Shimmer className="h-3 w-8 my-1" />
              <div className="flex flex-col gap-y-0.5">
                <Shimmer className="h-11 w-full rounded-b-none" />
                <Shimmer className="h-36 w-full rounded-t-none" />
              </div>
            </div>
            <div className="flex flex-col gap-y-1.5">
              <Shimmer className="h-3 w-28 my-1" />
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="flex items-center gap-x-2">
                  <Shimmer rounded="full" className="size-6" />
                  <div className="flex flex-col gap-y-0.5 flex-1">
                    <Shimmer className="h-11 w-full rounded-b-none" />
                    <Shimmer className="h-20 w-full rounded-t-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      <Card className="flex flex-col w-full p-0 lg:w-4/12 lg:sticky lg:right-0 lg:top-24">
        <div className="flex flex-col p-2">
          <Shimmer className="h-4 w-5/12 my-1.5" />
          <Shimmer className="h-3 w-8/12 my-1" />
        </div>
        <CardSeparator />
        <div className="flex flex-col items-center pb-2">
          <Shimmer className="h-3 w-28 my-3" />
          <Shimmer className="h-3 w-20 mt-1 mb-2.5" />
          <div className="grid grid-cols-5 gap-2 mb-2 xs:grid-cols-10 md:grid-cols-15 md:gap-3 md:px-2 lg:grid-cols-5 lg:px-3">
            {[...Array(7)].map((_, idx) => (
              <Shimmer key={idx} className="size-8" />
            ))}
          </div>
          <Shimmer className="h-3 w-20 mt-1 mb-2.5" />
          <div className="grid grid-cols-5 gap-2 mb-2 xs:grid-cols-10 md:grid-cols-15 md:gap-3 md:px-2 lg:grid-cols-5 lg:px-3">
            {[...Array(3)].map((_, idx) => (
              <Shimmer key={idx} className="size-8" />
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
