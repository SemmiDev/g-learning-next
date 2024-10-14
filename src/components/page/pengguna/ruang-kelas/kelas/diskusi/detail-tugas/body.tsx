'use client'

import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  Button,
  Card,
  CardSeparator,
  FileListItem,
  FilePreviewType,
  Komentar,
  Loader,
  ModalFilePreview,
  PustakaMediaFileType,
  Text,
  TextSpan,
  Time,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import { getFileType } from '@/utils/file-properties-from-api'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'
import KumpulkanTugasCard from './kumpulkan-card'
import TableTugasPesertaCard from './table-peserta-card'

export default function DiskusiDetailTugasPage() {
  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: async () => {
      const { data } = await lihatKelasAction(idKelas)
      return data
    },
  })

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.diskusi.tugas', idKelas, id],
    queryFn: async () => {
      const { data } = await lihatAktifitasAction(idKelas, id)
      return data
    },
  })

  if (data?.aktifitas.tipe !== 'Penugasan') return null

  const files = (data.file_aktifitas ?? []).map(
    (file) =>
      ({
        id: file.id,
        name: file.nama,
        folder: false,
        extension: file.ekstensi,
        size: file.ukuran,
        time: file.created_at,
        type: getFileType(file),
        link: file.url,
      } as PustakaMediaFileType)
  )

  return (
    <>
      <div className="mt-4 mb-4">
        <Link href={`${routes.pengguna.ruangKelas}/${idKelas}`}>
          <Button variant="text" color="primary" className="text-gray-dark">
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <Loader height={400} />
      ) : (
        <div className="flex flex-wrap items-start space-y-8 lg:space-x-4 lg:space-y-0">
          <Card
            className={cn(
              'flex flex-col p-0 w-full',
              dataKelas?.peran === 'Pengajar' ? 'lg:w-6/12' : 'lg:w-7/12'
            )}
          >
            <div className="flex justify-between items-start px-4 py-2">
              <div className="flex flex-col">
                <Text
                  size="lg"
                  weight="semibold"
                  variant="dark"
                  className="mb-2"
                >
                  {data.aktifitas.judul || '-'}
                </Text>
                <SanitizeHTML
                  html={data.aktifitas.deskripsi || '-'}
                  className="text-sm"
                />
                {data.aktifitas.batas_waktu && (
                  <Text
                    size="sm"
                    weight="semibold"
                    variant="dark"
                    className="mt-2"
                  >
                    Batas Waktu Pengumpulan:{' '}
                    <TextSpan color="danger">
                      <Time
                        date={data.aktifitas.batas_waktu}
                        format="datetime"
                        empty="-"
                      />
                    </TextSpan>
                  </Text>
                )}
              </div>
            </div>
            {files.length > 0 && (
              <>
                <CardSeparator />
                <div className="flex flex-col space-y-2 p-2">
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
              </>
            )}
            <CardSeparator />
            <Komentar
              idKelas={idKelas}
              idAktifitas={id}
              showPer={10}
              className="px-4 pt-4 pb-2"
            />
          </Card>

          {dataKelas?.peran === 'Pengajar' ? (
            <TableTugasPesertaCard />
          ) : (
            <KumpulkanTugasCard />
          )}
        </div>
      )}

      <ModalFilePreview
        file={filePreview}
        onClose={() => setFilePreview(undefined)}
      />
    </>
  )
}
