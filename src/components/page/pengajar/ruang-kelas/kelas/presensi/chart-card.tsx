import dynamic from 'next/dynamic'
import Card from '@/components/ui/card'
import { Text, Title } from 'rizzui'
import { ChartData } from './chart'

const ChartPresensi = dynamic(
  () => import('@/components/page/pengajar/ruang-kelas/kelas/presensi/chart'),
  { ssr: false }
)

export default function ChartPresensiCard({
  className,
  data,
  colors,
}: {
  className: string
  data: ChartData[]
  colors: string[]
}) {
  return (
    <div className={className}>
      <Card>
        <Title as="h4" className="text-[1.375rem] font-semibold">
          Persentase Tingkat Kehadiran
        </Title>
        <div className="flex flex-col items-center">
          <div className="w-[200px] h-[200px]">
            <ChartPresensi data={data} colors={colors} />
          </div>
          <div className="grid grid-cols-4 gap-2 lg:gap-6">
            {data.map((val, idx) => {
              return (
                <div key={idx}>
                  <div className="flex space-x-1 items-center">
                    <div
                      className="rounded-xl w-3 h-3"
                      style={{ backgroundColor: colors[idx] }}
                    ></div>
                    <Text className="text-sm font-semibold">{val.name}</Text>
                  </div>
                  <Text className="text-gray-dark text-[1.375rem] font-semibold">
                    {val.value}%
                  </Text>
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    </div>
  )
}
