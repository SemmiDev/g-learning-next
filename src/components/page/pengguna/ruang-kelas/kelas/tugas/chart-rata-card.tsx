import { Card, Title } from '@/components/ui'
import ChartTugasRata, { ChartRataData } from './chart-rata'

export default function ChartTugasRataCard({
  className,
  data,
}: {
  className?: string
  data: ChartRataData[]
}) {
  return (
    <div className={className}>
      <Card>
        <Title as="h4" size="1.5xl" weight="semibold" className="mb-4">
          Grafik Nilai Tugas Rata-Rata
        </Title>
        <div className="flex flex-col items-center min-h-[180px]">
          <ChartTugasRata data={data} />
        </div>
      </Card>
    </div>
  )
}
