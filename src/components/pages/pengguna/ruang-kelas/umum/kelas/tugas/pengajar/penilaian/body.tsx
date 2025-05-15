'use client'

import {
  Button,
  Card,
  CardSeparator,
  ControlledInputNumber,
  ControlledQuillEditor,
  FileListItem,
  FilePreviewType,
  Form,
  FormError,
  ModalFilePreview,
  PustakaMediaFileType,
  Shimmer,
  Text,
  Time,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatNilaiTugasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/pengajar/lihat-nilai-tugas'
import { simpanNilaiTugasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/pengajar/simpan-nilai-tugas'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import { handleActionWithToast } from '@/utils/action'
import { getFileSize, getFileType } from '@/utils/file-properties-from-api'
import { makeSimpleQueryData } from '@/utils/query-data'
import { z } from '@/utils/zod-id'
import { useRouter } from '@bprogress/next/app'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { RiArrowLeftLine } from 'react-icons/ri'
import DetailPesertaCard from './detail-peserta-card'
import KeteranganTugasCard from './keterangan-tugas-card'

const formSchema = z.object({
  nilai: z.number().min(0).max(100),
  catatan: z.string().optional(),
})

export type NilaiTugasFormSchema = {
  nilai: number | null
  catatan?: string
}

export default function PenilaianTugasBody() {
  const { jwt } = useSessionJwt()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [filePreview, setFilePreview] = useState<FilePreviewType>()
  const [formError, setFormError] = useState<string>()

  const {
    kelas: idKelas,
    id: idAktifitas,
    peserta: idPeserta,
  }: { kelas: string; id: string; peserta: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryData(lihatKelasApi, jwt, idKelas),
  })

  const tipeKelas = dataKelas?.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

  const queryKey = [
    'pengguna.ruang-kelas.tugas.penilaian',
    idKelas,
    idAktifitas,
    idPeserta,
  ]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: makeSimpleQueryData(
      lihatNilaiTugasApi,
      jwt,
      idKelas,
      idAktifitas,
      idPeserta
    ),
  })

  const initialValues: NilaiTugasFormSchema = {
    nilai: data?.nilai ?? null,
    catatan: data?.catatan_pengajar ?? '',
  }

  const onSubmit: SubmitHandler<NilaiTugasFormSchema> = async (data) => {
    await handleActionWithToast(
      simpanNilaiTugasApi(jwt, idKelas, idAktifitas, idPeserta, data),
      {
        loading: 'Menyimpan...',
        onStart: () => setFormError(undefined),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey })
        },
        onError: ({ message }) => setFormError(message),
      }
    )
  }

  const files = (data?.berkas ?? []).map(
    (item) =>
      ({
        id: item.id,
        name: item.nama,
        time: item.created_at,
        link: item.url,
        extension: item.ekstensi,
        folder: false,
        size: getFileSize(item),
        type: getFileType(item),
        driveId: item.id_instansi ?? undefined,
      } as PustakaMediaFileType)
  )

  const sudahDinilai = data?.nilai != null && data?.nilai != undefined

  return (
    <>
      <div className="mt-4 mb-4">
        <Link
          href={`${routes.pengguna.ruangKelas.dikelola[tipeKelas]}/${idKelas}/diskusi/tugas/${idAktifitas}`}
          onClick={() => router.back()}
        >
          <Button
            as="span"
            variant="text"
            color="primary"
            className="text-gray-dark"
          >
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>

      <KeteranganTugasCard className="mb-4" />

      <Form<NilaiTugasFormSchema>
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
            <DetailPesertaCard
              tipeKelas={tipeKelas}
              sudahDinilai={sudahDinilai}
              isSubmitting={isSubmitting}
              className="mb-4"
            />

            <div className="flex flex-wrap items-start gap-y-8 lg:gap-x-4 lg:gap-y-0">
              {isLoading ? (
                <SectionShimmer />
              ) : (
                <>
                  <Card className="flex flex-col flex-1 p-0">
                    <div className="flex flex-col p-2">
                      <Text weight="semibold" variant="dark">
                        Tugas yang dikumpulkan
                      </Text>
                      <Text size="xs" weight="medium" variant="lighter">
                        {data?.waktu_pengumpulan ? (
                          <>
                            Dikumpulkan pada{' '}
                            <Time date={data.waktu_pengumpulan} empty="-" />
                          </>
                        ) : (
                          'Belum dikumpulkan'
                        )}
                      </Text>
                    </div>
                    <CardSeparator />
                    <div className="p-2">
                      <SanitizeHTML html={data?.catatan_peserta || '-'} />
                      {files.length > 0 && (
                        <div className="flex flex-col gap-y-2 mt-2">
                          {files.map((file) => (
                            <FileListItem
                              key={file.id}
                              file={file}
                              onPreview={(file) => {
                                if (!file.link) return

                                setFilePreview({
                                  url: file.link,
                                  extension: file.extension,
                                  image: file.type === 'image',
                                })
                              }}
                              download
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>

                  <Card className="flex flex-col p-0 w-full lg:w-5/12">
                    <div className="flex flex-col gap-y-5 p-2">
                      <ControlledInputNumber
                        name="nilai"
                        control={control}
                        errors={errors}
                        label="Nilai"
                        placeholder="Berikan nilai. Contoh: 80"
                      />

                      <ControlledQuillEditor
                        name="catatan"
                        control={control}
                        errors={errors}
                        toolbar="minimalist"
                        size="md"
                        label="Catatan Tambahan"
                        placeholder="Berikan catatan kepada peserta terkait tugas yang dikumpulkan"
                      />

                      <FormError
                        error={formError}
                        onClose={() => setFormError(undefined)}
                      />
                    </div>
                  </Card>
                </>
              )}
            </div>
          </>
        )}
      </Form>

      <ModalFilePreview
        file={filePreview}
        onClose={() => setFilePreview(undefined)}
      />
    </>
  )
}

function SectionShimmer() {
  return (
    <>
      <Card className="flex flex-col flex-1 p-0">
        <div className="flex flex-col gap-y-2 px-2 py-2.5">
          <Shimmer className="h-3 w-1/3" />
          <Shimmer className="h-2 w-1/3" />
        </div>
        <CardSeparator />
        <div className="flex flex-col gap-y-2 px-2 py-2.5">
          <Shimmer className="h-2 w-full" />
          <Shimmer className="h-2 w-full" />
          <Shimmer className="h-2 w-1/3" />
        </div>
      </Card>

      <Card className="flex flex-col p-0 w-full lg:w-5/12">
        <div className="flex flex-col gap-y-5 px-2 py-3">
          <div className="flex flex-col gap-y-2">
            <Shimmer className="h-3 w-1/5" />
            <Shimmer className="h-10 w-full" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Shimmer className="h-3 w-1/4" />
            <Shimmer className="h-[12.175rem] w-full" />
          </div>
        </div>
      </Card>
    </>
  )
}
