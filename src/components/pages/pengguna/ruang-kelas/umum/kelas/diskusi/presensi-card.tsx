import { Card, CardSeparator, Shimmer, Text, Title } from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { presensiPesertaApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/peserta/presensi'
import cn from '@/utils/class-names'
import { roundedNumber } from '@/utils/number'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

type PresensiCardProps = { className?: string }

export default function PresensiCard({ className }: PresensiCardProps) {
  const { makeSimpleApiQueryData } = useSessionJwt()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.diskusi.presensi', idKelas],
    queryFn: makeSimpleApiQueryData(presensiPesertaApi, idKelas),
  })

  if (isLoading) return <CardShimmer className={className} />

  return (
    <>
      <Card className={cn('p-0', className)}>
        <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
          Presensi
        </Title>
        <CardSeparator />
        <div className="flex justify-between gap-5 px-2 py-3">
          <PresensiItem status="Hadir" jumlah={data?.total_hadir || 0} />
          <PresensiItem status="Sakit" jumlah={data?.total_sakit || 0} />
          <PresensiItem status="Izin" jumlah={data?.total_izin || 0} />
          <PresensiItem status="Alpha" jumlah={data?.total_alpha || 0} />
        </div>
        <div className="flex justify-between px-2 pb-2">
          <Text size="sm" weight="medium" variant="lighter">
            Total keseluruhan presensi: <b>{data?.total_keseluruhan_absensi}</b>
          </Text>
          <Text size="sm" weight="medium" variant="lighter">
            Tingkat kehadiran:{' '}
            <span className="text-success">
              {data?.tingkat_kehadiran
                ? roundedNumber(data?.tingkat_kehadiran)
                : '-'}
              %
            </span>
          </Text>
        </div>
      </Card>
    </>
  )
}

type PresensiItemProps = {
  status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpha'
  jumlah: number
}
function PresensiItem({ status, jumlah }: PresensiItemProps) {
  let bgColor
  switch (status) {
    case 'Hadir':
      bgColor = 'bg-slight-green'
      break
    case 'Sakit':
      bgColor = 'bg-slight-blue'
      break
    case 'Izin':
      bgColor = 'bg-slight-yellow'
      break
    case 'Alpha':
      bgColor = 'bg-slight-red'
      break
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-md min-w-20 p-2',
        bgColor
      )}
    >
      <Text size="1.5xl" weight="semibold" variant="dark">
        {jumlah}
      </Text>
      <Text size="sm" weight="medium" variant="lighter">
        {status}
      </Text>
    </div>
  )
}

function CardShimmer({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="px-2 py-3">
        <Shimmer className="h-3 w-1/3" />
      </div>
      <CardSeparator />
      <div className="flex justify-between gap-5 px-2 py-3">
        {[...Array(4)].map((_, idx) => (
          <Shimmer key={idx} className="h-[4.125rem] min-w-20" />
        ))}
      </div>
      <div className="flex justify-between px-2 pb-2">
        <Shimmer className="h-2.5 w-1/3" />
        <Shimmer className="h-2.5 w-1/3" />
      </div>
    </Card>
  )
}
