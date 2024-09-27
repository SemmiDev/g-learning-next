'use client'

import { lihatBankSoalAction } from '@/actions/pengguna/bank-soal/lihat'
import { hapusSoalAction } from '@/actions/pengguna/bank-soal/soal/hapus'
import { listSoalAction } from '@/actions/pengguna/bank-soal/soal/list'
import { tambahSoalAction } from '@/actions/pengguna/bank-soal/soal/tambah'
import {
  ActionIcon,
  Button,
  Card,
  CardSeparator,
  ControlledQuillEditor,
  ControlledRadio,
  Form,
  FormError,
  ModalConfirm,
  Text,
  TextLabel,
  Title,
} from '@/components/ui'
import ButtonSubmit from '@/components/ui/button/submit'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { PILIHAN_JAWABAN } from '@/config/const'
import { handleActionWithToast } from '@/utils/action'
import { removeIndexFromList } from '@/utils/list'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'
import { required } from '@/utils/validations/pipe'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { createRef, RefObject, useMemo, useRef, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { BiCircle } from 'react-icons/bi'
import { BsPencil, BsPlus, BsTrash } from 'react-icons/bs'
import { FieldError } from 'rizzui'
import ImportSoalModal from './modal/import'
import UbahSoalModal from './modal/ubah'

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

export type TambahSoalFormSchema = {
  soal?: string
  jawaban: string[]
  benar?: string
}

const initialValues: TambahSoalFormSchema = {
  jawaban: ['', '', ''],
}

export default function KelolaSoalBody() {
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string>()
  const [showModalImport, setShowModalImport] = useState(false)
  const [resetValues, setResetValues] = useState<TambahSoalFormSchema>()
  const [idUbah, setIdUbah] = useState<string>()
  const [idHapus, setIdHapus] = useState<string>()

  const soalBaruRef = useRef<HTMLDivElement>(null)

  const {
    kategori: idKategori,
    soal: idBankSoal,
  }: { kategori: string; soal: string } = useParams()

  const { data: dataBankSoal } = useQuery({
    queryKey: ['pengguna.bank-soal.lihat', idKategori, idBankSoal],
    queryFn: async () => {
      const { data } = await lihatBankSoalAction(idKategori, idBankSoal)

      return data ?? null
    },
  })

  const queryKey = ['pengguna.bank-soal.soal.list', idKategori, idBankSoal]

  const { data: listSoal = [] } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await listSoalAction(idBankSoal)

      return data?.list ?? []
    },
  })

  type DataType = (typeof listSoal)[number]

  const soalRef = useMemo(
    () => listSoal.map(() => createRef() as RefObject<HTMLDivElement>),
    [listSoal]
  )

  const onSubmit: SubmitHandler<TambahSoalFormSchema> = async (data) => {
    await handleActionWithToast(tambahSoalAction(idBankSoal, data), {
      loading: 'Menyimpan...',
      onStart: () => setFormError(undefined),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey })
        setResetValues({
          soal: undefined,
          jawaban: data.jawaban.map(() => ''),
          benar: undefined,
        })
      },
      onError: ({ message }) => setFormError(message),
    })
  }

  const handleHapus = () => {
    if (!idHapus) return

    handleActionWithToast(hapusSoalAction(idBankSoal, idHapus), {
      loading: 'Menghapus...',
      onSuccess: () => {
        setIdHapus(undefined)
        queryClient.setQueryData(queryKey, (oldData: DataType[]) =>
          oldData.filter((item) => item.id !== idHapus)
        )
        queryClient.invalidateQueries({ queryKey })
      },
    })
  }

  return (
    <>
      <div className="flex flex-col-reverse items-center gap-4 lg:flex-row lg:items-start">
        <div className="flex flex-col gap-4 w-full">
          <Card ref={soalBaruRef} className="flex flex-col scroll-m-24 p-0">
            <Form<TambahSoalFormSchema>
              onSubmit={onSubmit}
              validationSchema={formSchema}
              resetValues={resetValues}
              useFormProps={{ mode: 'onSubmit', defaultValues: initialValues }}
            >
              {({
                control,
                watch,
                setValue,
                formState: { errors, isSubmitting },
              }) => (
                <>
                  <div className="flex justify-between items-center space-x-2 p-2">
                    <Title as="h6" weight="semibold">
                      Soal Nomor {listSoal.length + 1}
                    </Title>
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
                  </div>
                  <CardSeparator />
                  <div className="flex flex-col space-y-3 p-2">
                    <FormError error={formError} />

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
                    />

                    <div className="space-y-2">
                      <div>
                        <TextLabel>Pilihan Jawaban</TextLabel>
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
                              watch('jawaban').length >= PILIHAN_JAWABAN.length
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
                  </div>
                </>
              )}
            </Form>
          </Card>

          {listSoal.map((soal, idx) => (
            <Card
              ref={soalRef[idx]}
              key={soal.id}
              className="flex flex-col scroll-m-24 p-0"
            >
              <div className="flex justify-between items-center space-x-2 p-2">
                <Title as="h6" weight="semibold">
                  Soal Nomor {idx + 1}
                </Title>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    color="warning"
                    onClick={() => setIdUbah(soal.id)}
                  >
                    <BsPencil className="mr-1" />
                    Ubah Soal
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    color="danger"
                    onClick={() => setIdHapus(soal.id)}
                  >
                    <BsTrash className="mr-1" />
                    Hapus Soal
                  </Button>
                </div>
              </div>
              <CardSeparator />
              <div className="flex flex-col space-y-3 text-gray-dark p-2">
                <SanitizeHTML html={soal.pertanyaan} className="font-medium" />
                <div className="flex flex-col space-y-2">
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
                        className="flex space-x-1 items-center"
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
                        <SanitizeHTML html={jawaban} className="font-medium" />
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Card className="flex flex-col p-0 lg:w-4/12 lg:sticky lg:right-0 lg:top-24">
          <div className="flex flex-col p-2">
            <Title as="h6" weight="semibold">
              {dataBankSoal?.judul ?? ''}
            </Title>
            <SanitizeHTML
              html={dataBankSoal?.deskripsi || '-'}
              className="text-sm font-medium text-gray-lighter"
            />
          </div>
          <CardSeparator />
          <div className="flex flex-col space-y-2 p-2">
            <Text
              size="sm"
              weight="semibold"
              variant="dark"
              className="text-center"
            >
              Soal yang sudah dibuat
            </Text>
            <div className="grid grid-cols-10 gap-2 lg:grid-cols-5">
              {listSoal.map((_, idx) => (
                <div className="flex justify-center items-center" key={idx}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="size-8"
                    onClick={() => {
                      soalRef[idx]?.current?.scrollIntoView({
                        behavior: 'smooth',
                      })
                    }}
                  >
                    {idx + 1}
                  </Button>
                </div>
              ))}
              <div className="flex justify-center items-center">
                <Button
                  size="sm"
                  variant="solid"
                  className="size-8"
                  onClick={() => {
                    soalBaruRef.current?.scrollIntoView({
                      behavior: 'smooth',
                    })
                  }}
                >
                  {listSoal.length + 1}
                </Button>
              </div>
            </div>
          </div>
          <CardSeparator />
        </Card>
      </div>

      <ImportSoalModal
        showModal={showModalImport}
        setShowModal={setShowModalImport}
        refetchKey={queryKey}
      />

      <UbahSoalModal id={idUbah} setId={setIdUbah} />

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
  )
}
