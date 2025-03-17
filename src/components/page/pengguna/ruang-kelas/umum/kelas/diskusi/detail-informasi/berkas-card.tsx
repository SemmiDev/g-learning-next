import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import {
  Card,
  CardSeparator,
  FileListItem,
  FileListItemShimmer,
  FilePreviewType,
  PustakaMediaFileType,
  Shimmer,
  Text,
  Title,
} from '@/components/ui'
import cn from '@/utils/class-names'
import { getFileType } from '@/utils/file-properties-from-api'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

type BerkasCardProps = {
  setFilePreview: (file: FilePreviewType) => void
  className?: string
}

export default function BerkasCard({
  className,
  setFilePreview,
}: BerkasCardProps) {
  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.detail.informasi', idKelas, id],
    queryFn: makeSimpleQueryDataWithParams(lihatAktifitasAction, idKelas, id),
  })

  if (isLoading) return <BerkasCardShimmer className={className} />

  if (data?.aktifitas.tipe !== 'Pengumuman') return null

  const files = (data?.file_aktifitas ?? []).map(
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
    <Card className={cn('flex flex-col p-0', className)}>
      <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
        Berkas Informasi
      </Title>
      <CardSeparator />
      <div className="flex flex-col gap-y-2 p-2">
        {files.length > 0 ? (
          files.map((file) => (
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
          ))
        ) : (
          <Text size="sm" align="center" className="py-4">
            Tidak ada berkas
          </Text>
        )}
      </div>
    </Card>
  )
}

function BerkasCardShimmer({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="px-2 py-3">
        <Shimmer className="h-3.5 w-1/2" />
      </div>
      <CardSeparator />
      <div className="flex flex-col gap-y-2 p-2">
        {[...Array(3)].map((_, idx) => (
          <FileListItemShimmer key={idx} />
        ))}
      </div>
      <CardSeparator />
    </Card>
  )
}
