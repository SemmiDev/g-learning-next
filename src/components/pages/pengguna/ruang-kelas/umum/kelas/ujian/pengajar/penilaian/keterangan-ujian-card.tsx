import { Card, Shimmer, Title } from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatAktifitasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/lihat'
import cn from '@/utils/class-names'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

type KeteranganUjianCardProps = {
  className?: string
}

export default function KeteranganUjianCard({
  className,
}: KeteranganUjianCardProps) {
  const { jwt } = useSessionJwt()

  const {
    kelas: idKelas,
    id: idAktifitas,
  }: { kelas: string; id: string; peserta: string } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.diskusi.tugas', idKelas, idAktifitas],
    queryFn: makeSimpleQueryDataWithParams(
      lihatAktifitasApi,
      jwt,
      idKelas,
      idAktifitas
    ),
  })

  if (isLoading) return <CardShimmer className={className} />

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

function CardShimmer({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col gap-y-3 py-3', className)}>
      <Shimmer className="h-4 w-1/6" />
      <Shimmer className="h-3 w-1/2" />
    </Card>
  )
}
