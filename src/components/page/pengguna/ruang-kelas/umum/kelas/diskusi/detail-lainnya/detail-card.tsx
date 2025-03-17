import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import {
  Card,
  CardSeparator,
  Komentar,
  Text,
  Thumbnail,
  Time,
  Title,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import cn from '@/utils/class-names'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import DetailCardShimmer from '../shimmer/detail-card'

type DetailCardProps = {
  className?: string
}

export default function DetailCard({ className }: DetailCardProps) {
  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const queryKey = ['pengguna.ruang-kelas.detail.lainnya', idKelas, id]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: makeSimpleQueryDataWithParams(lihatAktifitasAction, idKelas, id),
  })

  if (isLoading) return <DetailCardShimmer className={className} />

  if (data?.aktifitas.tipe !== 'Diskusi') return null

  return (
    <>
      <Card className={cn('flex flex-col p-0', className)}>
        <div className="flex items-center gap-x-3 px-4 py-3">
          <Thumbnail
            src={data.pembuat.foto || undefined}
            alt="profil"
            size={48}
            rounded="lg"
            avatar={data.pembuat.nama}
          />
          <div className="flex flex-col">
            <Text weight="semibold" variant="dark">
              {data.pembuat.nama || '-'}
            </Text>
            <Text size="xs" weight="medium" variant="lighter">
              <Time date={data.aktifitas.created_at} fromNow />
            </Text>
          </div>
        </div>
        <CardSeparator />
        <div className="flex flex-col px-4 py-2">
          <Title size="1.5xl" weight="semibold" variant="dark" className="mb-2">
            {data.aktifitas.judul || '-'}
          </Title>
          <SanitizeHTML
            html={data.aktifitas.deskripsi || '-'}
            className="text-sm"
          />
        </div>
        <CardSeparator />
        <Komentar
          idKelas={idKelas}
          idAktifitas={id}
          total={data.total_komentar}
          invalidateQueries={[queryKey]}
          firstShow={5}
          showPer={10}
          className="p-4"
        />
      </Card>
    </>
  )
}
