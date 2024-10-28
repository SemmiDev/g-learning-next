import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import {
  Card,
  CardSeparator,
  Komentar,
  Text,
  Thumbnail,
  Time,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import cn from '@/utils/class-names'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import imagePhoto from '@public/images/photo.png'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import DetailCardShimmer from '../shimmer/detail-card'

type DetailCardProps = {
  className?: string
}

export default function DetailCard({ className }: DetailCardProps) {
  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.diskusi.lainnya', idKelas, id],
    queryFn: makeSimpleQueryDataWithParams(lihatAktifitasAction, idKelas, id),
  })

  if (isLoading) return <DetailCardShimmer className={className} />

  if (data?.aktifitas.tipe !== 'Diskusi') return null

  return (
    <>
      <Card className={cn('flex flex-col p-0', className)}>
        <div className="flex items-center space-x-3 px-4 py-3">
          {/* TODO: tampilkan foto pembuat dari data API */}
          <Thumbnail src={imagePhoto} alt="profil" size={48} rounded="lg" />
          <div className="flex flex-col">
            <Text weight="semibold" variant="dark">
              {/* TODO: tampilkan nama pembuat dari data API */}
              Prabroro Janggar
            </Text>
            <Text size="xs" weight="medium" variant="lighter">
              <Time date={data.aktifitas.created_at} fromNow />
            </Text>
          </div>
        </div>
        <CardSeparator />
        <div className="flex flex-col px-4 py-2">
          <Text size="lg" weight="semibold" variant="dark" className="mb-2">
            {data.aktifitas.judul || '-'}
          </Text>
          <SanitizeHTML
            html={data.aktifitas.deskripsi || '-'}
            className="text-sm"
          />
        </div>
        <CardSeparator />
        <Komentar
          idKelas={idKelas}
          idAktifitas={id}
          /* TODO: tampilkan total komentar jika API sudah ada */
          firstShow={5}
          showPer={10}
          className="p-4"
        />
      </Card>
    </>
  )
}
