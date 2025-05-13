import { DataType } from '@/services/api/pengguna/ruang-kelas/aktifitas/lihat'
import {
  Card,
  CardSeparator,
  FileListItem,
  FilePreviewType,
  Komentar,
  PustakaMediaFileType,
  Text,
  TextSpan,
  Time,
  Title,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import cn from '@/utils/class-names'
import { getFileType } from '@/utils/file-properties-from-api'
import { useParams } from 'next/navigation'
import DetailCardShimmer from '../shimmer/detail-card'
import { passedTime } from '@/utils/time'

type DetailCardProps = {
  data: DataType | undefined
  isLoading: boolean
  setFilePreview: (file: FilePreviewType) => void
  className?: string
}

export default function DetailCard({
  data,
  isLoading,
  setFilePreview,
  className,
}: DetailCardProps) {
  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  if (isLoading) return <DetailCardShimmer className={className} />

  if (data?.aktifitas.tipe !== 'Penugasan') return null

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
      <div className="flex flex-col px-4 py-2">
        <Title size="1.5xl" weight="semibold" variant="dark" className="mb-2">
          {data?.aktifitas.judul || '-'}
        </Title>
        <SanitizeHTML
          html={data?.aktifitas.deskripsi || '-'}
          className="text-sm"
        />
        {data?.aktifitas.batas_waktu && (
          <Text size="sm" weight="semibold" variant="dark" className="mt-2">
            Batas Waktu Pengumpulan:{' '}
            <TextSpan
              variant="dark"
              color={
                passedTime(data?.aktifitas.batas_waktu) ? 'danger' : 'gray'
              }
            >
              <Time
                date={data?.aktifitas.batas_waktu}
                format="datetime"
                empty="-"
              />
            </TextSpan>
          </Text>
        )}
      </div>
      {files.length > 0 && (
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
                    image: file.type === 'image',
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
        invalidateQueries={[['pengguna.ruang-kelas.detail.tugas', idKelas, id]]}
        firstShow={5}
        showPer={10}
        className="p-4"
      />
    </Card>
  )
}
