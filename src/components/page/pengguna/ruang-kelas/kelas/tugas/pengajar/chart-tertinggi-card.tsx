import { Card, Title } from '@/components/ui'
import ChartTugasTertinggi, { ChartTertinggiData } from './chart-tertinggi'

export default function ChartTugasTertinggiCard({
  className,
  data,
}: {
  className?: string
  data: ChartTertinggiData[]
}) {
  return (
    <div className={className}>
      <Card>
        <Title as="h4" size="1.5xl" weight="semibold" className="mb-4">
          Grafik Nilai Tugas Tertinggi
        </Title>
        <div className="flex flex-col items-center min-h-[180px]">
          <ChartTugasTertinggi data={data} />
        </div>
      </Card>
    </div>
  )
}
