'use client'

import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
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
  Text,
  Thumbnail,
  Time,
  Title,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { routes } from '@/config/routes'
import { handleActionWithToast } from '@/utils/action'
import { getFileSize, getFileType } from '@/utils/file-properties-from-api'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { z } from '@/utils/zod-id'
import imagePhoto from '@public/images/photo.png'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { LuChevronDown } from 'react-icons/lu'
import { RiArrowLeftLine } from 'react-icons/ri'

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

  /* TODO: query data peserta */
  // const { data: dataPeserta } = useQuery({
  //   queryKey: ['pengguna.ruang-kelas.peserta', idPeserta],
  //   queryFn: async () => {},
  // })

  const { data: dataAktifitas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.diskusi.tugas', idKelas, idAktifitas],
    queryFn: makeSimpleQueryDataWithParams(
      lihatAktifitasAction,
      idKelas,
      idAktifitas
    ),
  })

  const queryKey = [
    'pengguna.ruang-kelas.tugas.penilaian',
    idKelas,
    idAktifitas,
    '01JA4XZDYPG48DB2B8CFTYXT8M',
  ]

  const { data } = useQuery({
    queryKey,
    queryFn: makeSimpleQueryDataWithParams(
      lihatNilaiTugasAction,
      idKelas,
      idAktifitas,
      '01JA4XZDYPG48DB2B8CFTYXT8M'
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

  const files = (data?.daftar_berkas_pengumpulan_tugas ?? []).map(
    (item) =>
      ({
        id: item.berkas.id,
        name: item.berkas.nama,
        time: item.berkas.created_at,
        link: item.berkas.url,
        extension: item.berkas.ekstensi,
        folder: false,
        size: getFileSize(item.berkas),
        type: getFileType(item.berkas),
        driveId: item.berkas.id_instansi ?? undefined,
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
          <Button variant="text" color="primary" className="text-gray-dark">
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>

      <Card className="flex flex-col mb-4">
        <Title as="h4">{dataAktifitas?.aktifitas.judul || '-'}</Title>
        <SanitizeHTML
          html={dataAktifitas?.aktifitas.deskripsi || '-'}
          className="font-medium text-gray-lighter"
        />
      </Card>

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
            <Card className="flex flex-col justify-between items-center gap-2 mb-4 lg:flex-row">
              <div
                className="flex justify-between items-center w-full border border-gray-100 rounded-md bg-gray-50 cursor-pointer p-2 lg:w-8/12"
                onClick={() => {}}
              >
                <div className="flex items-center space-x-2">
                  {/* TODO: tampilkan foto peserta */}
                  <Thumbnail src={imagePhoto} alt="profil" size={48} />
                  {/* TODO: tampilkan nama peserta */}
                  <Text weight="semibold" variant="dark">
                    Prabroro Janggar
                  </Text>
                </div>
                <div className="flex items-center space-x-4">
                  <Text
                    weight="semibold"
                    color={sudahDinilai ? 'primary' : 'gray'}
                    variant={sudahDinilai ? 'default' : 'lighter'}
                  >
                    {sudahDinilai ? 'Sudah Dinilai' : 'Belum Dinilai'}
                  </Text>
                  <LuChevronDown size={24} />
                </div>
              </div>
              <div className="flex justify-end flex-1">
                <Button type="submit" disabled={isSubmitting}>
                  Simpan Penilaian
                </Button>
              </div>
            </Card>

            <div className="flex flex-wrap items-start space-y-8 lg:space-x-4 lg:space-y-0">
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
                      {files.map((file, idx) => (
                        <FileListItem
                          key={file.id + idx}
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
