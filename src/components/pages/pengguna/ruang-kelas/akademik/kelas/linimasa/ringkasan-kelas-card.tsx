import { ringkasanKelasAction } from '@/services/api/pengguna/ruang-kelas/aktifitas/akademik/ringkasan-kelas'
import { Card, CardSeparator, Shimmer, Text, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Progressbar } from 'rizzui'

type RingkasanKelasCardProps = {
  className?: string
}

export default function RingkasanKelasCard({
  className,
}: RingkasanKelasCardProps) {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.linimasa.ringkasan-kelas', idKelas],
    queryFn: makeSimpleQueryDataWithId(ringkasanKelasAction, idKelas),
  })

  if (isLoading || !data) return <CardShimmer className={className} />

  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <Title as="h5" weight="semibold" className="px-2 py-1.5">
        Ringkasan Kelas
      </Title>
      <CardSeparator />
      <div className="flex flex-col gap-y-2 px-2 py-3">
        <ProgressItem
          label="Sesi Pembelajaran"
          value={`${data.total_pertemuan_terlaksana}/${data.total_pertemuan}`}
          persen={Math.round(
            (data.total_pertemuan_terlaksana / data.total_pertemuan) * 100
          )}
        />
        <ProgressItem
          label="Kehadiran Peserta"
          value={`${data.persentase_kehadiran_peserta}%`}
          persen={data.persentase_kehadiran_peserta}
        />
        <ProgressItem
          label="Kehadiran Pengajar"
          value={`${data.persentase_kehadiran_pengajar}%`}
          persen={data.persentase_kehadiran_pengajar}
        />
      </div>
    </Card>
  )
}

function ProgressItem({
  label,
  value,
  persen,
}: {
  label: string
  value: string
  persen: number
}) {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex justify-between gap-x-2">
        <Text size="sm" weight="semibold">
          {label}
        </Text>
        <Text size="sm" weight="semibold">
          {value}
        </Text>
      </div>
      <Progressbar
        variant="solid"
        color="success"
        rounded="none"
        className="gap-0"
        value={persen}
      />
    </div>
  )
}

function CardShimmer({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="px-2 py-3">
        <Shimmer className="h-4 w-1/4" />
      </div>
      <CardSeparator />
      <div className="flex flex-col gap-y-2 px-2 py-3">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="flex flex-col gap-y-1">
            <div className="flex justify-between gap-x-2 py-1.5">
              <Shimmer className="h-2 w-4/12" />
              <Shimmer className="h-2 w-1/12" />
            </div>
            <Shimmer rounded="none" className="h-2 w-full" />
          </div>
        ))}
      </div>
    </Card>
  )
}
