'use client'

import { lihatNilaiTugasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/pengajar/lihat-nilai-tugas'
import { simpanNilaiTugasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/pengajar/simpan-nilai-tugas'
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
import { handleActionWithToast } from '@/utils/action'
import { getFileSize, getFileType } from '@/utils/file-properties-from-api'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { z } from '@/utils/zod-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
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
  const router = useRouter()
  const queryClient = useQueryClient()
  const [filePreview, setFilePreview] = useState<FilePreviewType>()
  const [formError, setFormError] = useState<string>()

  const {
    kelas: idKelas,
    aktifitas: idAktifitas,
    id: idPeserta,
  }: { kelas: string; aktifitas: string; id: string } = useParams()

  const queryKey = [
    'pengguna.ruang-kelas.tugas.penilaian',
    idKelas,
    idAktifitas,
    idPeserta,
  ]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: makeSimpleQueryDataWithParams(
      lihatNilaiTugasAction,
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
      simpanNilaiTugasAction(idKelas, idAktifitas, idPeserta, data),
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
          href={`${routes.pengguna.ruangKelas}/${idKelas}/diskusi/tugas/${idAktifitas}`}
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
              sudahDinilai={sudahDinilai}
              isSubmitting={isSubmitting}
              className="mb-4"
            />

            <div className="flex flex-wrap items-start space-y-8 lg:space-x-4 lg:space-y-0">
              {isLoading ? (
                <ShimmerSection />
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
                        <div className="flex flex-col space-y-2 mt-2">
                          {files.map((file) => (
                            <FileListItem
                              key={file.id}
                              file={file}
                              onPreview={(file) => {
                                if (!file.link) return

                                setFilePreview({
                                  url: file.link,
                                  extension: file.extension,
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
                    <div className="space-y-5 p-2">
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

function ShimmerSection() {
  return (
    <>
      <Card className="flex flex-col flex-1 p-0">
        <div className="flex flex-col space-y-2 px-2 py-2.5">
          <Shimmer className="h-3 w-1/3" />
          <Shimmer className="h-2 w-1/3" />
        </div>
        <CardSeparator />
        <div className="space-y-2 px-2 py-2.5">
          <Shimmer className="h-2 w-full" />
          <Shimmer className="h-2 w-full" />
          <Shimmer className="h-2 w-1/3" />
        </div>
      </Card>

      <Card className="flex flex-col p-0 w-full lg:w-5/12">
        <div className="space-y-5 px-2 py-3">
          <div className="space-y-2">
            <Shimmer className="h-3 w-1/5" />
            <Shimmer className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Shimmer className="h-3 w-1/4" />
            <Shimmer className="h-[12.175rem] w-full" />
          </div>
        </div>
      </Card>
    </>
  )
}
