import { Card, Text, Title } from '@/components/ui'
import ChartPresensi, { ChartData } from './chart'

export default function ChartPresensiCard({
  className,
  data,
  colors,
}: {
  className?: string
  data: ChartData[]
  colors: string[]
}) {
  return (
    <div className={className}>
      <Card>
        <Title as="h4" size="1.5xl" weight="semibold">
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
                  <div className="flex gap-x-1 items-center">
                    <div
                      className="rounded-xl w-3 h-3"
                      style={{ backgroundColor: colors[idx] }}
                    ></div>
                    <Text size="sm" weight="semibold">
                      {val.name}
                    </Text>
                  </div>
                  <Text size="1.5xl" weight="semibold" variant="dark">
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
