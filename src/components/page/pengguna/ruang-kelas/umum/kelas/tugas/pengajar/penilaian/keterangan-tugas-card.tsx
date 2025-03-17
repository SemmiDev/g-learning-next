import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { Card, Shimmer, Title } from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import cn from '@/utils/class-names'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

type KeteranganTugasCardProps = {
  className?: string
}

export default function KeteranganTugasCard({
  className,
}: KeteranganTugasCardProps) {
  const {
    kelas: idKelas,
    aktifitas: idAktifitas,
  }: { kelas: string; aktifitas: string } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.diskusi.tugas', idKelas, idAktifitas],
    queryFn: makeSimpleQueryDataWithParams(
      lihatAktifitasAction,
      idKelas,
      idAktifitas
    ),
  })

  if (isLoading) return <ShimmerCard className={className} />

  return (
    <Card className={cn('flex flex-col', className)}>
      <Title as="h4">{data?.aktifitas.judul || '-'}</Title>
      <SanitizeHTML
        html={data?.aktifitas.deskripsi || '-'}
        className="font-medium text-gray-lighter"
      />
    </Card>
  )
}

function ShimmerCard({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col gap-y-3 py-3', className)}>
      <Shimmer className="h-4 w-1/6" />
      <Shimmer className="h-3 w-1/2" />
    </Card>
  )
}
