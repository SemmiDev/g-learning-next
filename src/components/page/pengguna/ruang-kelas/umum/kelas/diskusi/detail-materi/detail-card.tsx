import { DataType as DataAktifitasType } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { DataType as DataKelasType } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  Card,
  CardSeparator,
  FileListItem,
  FilePreviewType,
  Komentar,
  PustakaMediaFileType,
  Title,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import cn from '@/utils/class-names'
import { getFileType } from '@/utils/file-properties-from-api'
import DetailCardShimmer from '../shimmer/detail-card'
import { useParams } from 'next/navigation'

type DetailCardProps = {
  kelas: DataKelasType | undefined
  data: DataAktifitasType | undefined
  isLoading?: boolean
  showFull?: boolean
  setFilePreview: (file: FilePreviewType) => void
  className?: string
}

export default function DetailCard({
  kelas,
  data,
  isLoading,
  showFull,
  setFilePreview,
  className,
}: DetailCardProps) {
  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  if (isLoading) return <DetailCardShimmer className={className} />

  if (!kelas || !data) return null

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
          <Title size="1.5xl" weight="semibold" variant="dark">
            {data.aktifitas.judul || '-'}
          </Title>
          {showFull && (
            <SanitizeHTML
              html={data.aktifitas.deskripsi || '-'}
              className="text-sm mt-2"
            />
          )}
        </div>
        {kelas?.peran === 'Pengajar' && files.length > 0 && (
          <>
            <CardSeparator />
            <div className="flex flex-col gap-y-2 px-3 py-2">
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
        {showFull && (
          <>
            <CardSeparator />
            <Komentar
              idKelas={kelas.kelas.id}
              idAktifitas={data.aktifitas.id}
              total={data.total_komentar}
              invalidateQueries={[
                ['pengguna.ruang-kelas.detail.materi', idKelas, id],
              ]}
              firstShow={5}
              showPer={10}
              className="p-4"
            />
          </>
        )}
      </Card>
    </>
  )
}
