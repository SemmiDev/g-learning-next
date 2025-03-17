import { dataNilaiAction } from '@/actions/pengguna/ruang-kelas/tugas/pengajar/data-nilai'
import { Card, Shimmer } from '@/components/ui'
import cn from '@/utils/class-names'
import { roundedNumber } from '@/utils/number'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { useParams } from 'next/navigation'
import PengajarChartTugasRataCard from './chart-rata-card'
import PengajarChartTugasTertinggiCard from './chart-tertinggi-card'

export type ChartData = {
  name: string
  value: number
}

export default function PengajarChartSection() {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.tugas.chart-data', 'pengajar', idKelas],
    queryFn: async () => {
      const { data } = await dataNilaiAction(idKelas)

      return {
        tertinggi: (data?.grafik_nilai_tugas_tertinggi ?? []).map(
          (item) =>
            ({
              name: moment(item.tanggal).format('DD/MM/YY'),
              value: roundedNumber(item.nilai),
            } as ChartData)
        ),
        rata: (data?.grafik_nilai_tugas_rata_rata ?? []).map(
          (item) =>
            ({
              name: moment(item.tanggal).format('DD/MM/YY'),
              value: roundedNumber(item.nilai),
            } as ChartData)
        ),
      }
    },
  })

  if (isLoading) return <ShimmerSection />

  return (
    <>
      <PengajarChartTugasTertinggiCard data={data?.tertinggi || []} />
      <PengajarChartTugasRataCard data={data?.rata || []} />
    </>
  )
}

function ShimmerSection() {
  return (
    <>
      <ShimmerCard />
      <ShimmerCard />
    </>
  )
}

function ShimmerCard() {
  return (
    <Card className="flex flex-col">
      <div className="pt-2 pb-5">
        <Shimmer className="h-6 w-1/4" />
      </div>
      <div className="flex justify-center items-end gap-x-2 h-[8.625rem] border-b-2 border-l-2 border-gray-100 ml-16 mb-8 mr-2 sm:gap-x-4 md:gap-x-6 lg:gap-x-8">
        {[...Array(14)].map((_, idx) => (
          <Shimmer
            key={idx}
            className={cn(
              'w-4 rounded-none sm:w-5',
              idx % 3 === 0
                ? 'h-[8.625rem]'
                : (idx + 1) % 3 === 0
                ? 'h-32'
                : 'h-28'
            )}
          />
        ))}
      </div>
    </Card>
  )
}
