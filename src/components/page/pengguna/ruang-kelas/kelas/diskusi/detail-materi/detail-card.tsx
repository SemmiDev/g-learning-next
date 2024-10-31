import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { DataType as DataKelasType } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  Card,
  CardSeparator,
  FileListItem,
  FilePreviewType,
  Komentar,
  PustakaMediaFileType,
  Text,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import cn from '@/utils/class-names'
import { getFileType } from '@/utils/file-properties-from-api'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import DetailCardShimmer from '../shimmer/detail-card'

type DetailCardProps = {
  kelas?: DataKelasType
  setFilePreview: (file: FilePreviewType) => void
  className?: string
}

export default function DetailCard({
  kelas,
  setFilePreview,
  className,
}: DetailCardProps) {
  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.diskusi.materi', idKelas, id],
    queryFn: makeSimpleQueryDataWithParams(lihatAktifitasAction, idKelas, id),
  })

  if (isLoading) return <DetailCardShimmer className={className} />

  if (data?.aktifitas.tipe !== 'Materi') return null

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
      <Card className={cn('flex flex-col p-0', className)}>
        <div className="flex flex-col px-4 py-2">
          <Text size="lg" weight="semibold" variant="dark" className="mb-2">
            {data.aktifitas.judul || '-'}
          </Text>
          <SanitizeHTML
            html={data.aktifitas.deskripsi || '-'}
            className="text-sm"
          />
        </div>
        {kelas?.peran === 'Pengajar' && files.length > 0 && (
          <>
            <CardSeparator />
            <div className="flex flex-col space-y-2 px-3 py-2">
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
          total={data.total_komentar}
          firstShow={5}
          showPer={10}
          className="p-4"
        />
      </Card>
    </>
  )
}
