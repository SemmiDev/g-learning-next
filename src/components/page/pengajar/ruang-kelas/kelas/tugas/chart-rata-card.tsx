import { Card, Title } from '@/components/ui'
import dynamic from 'next/dynamic'
import { ChartRataData } from './chart-rata'

const ChartTugasRata = dynamic(() => import('./chart-rata'), {
  ssr: false,
})

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
        <Title as="h4" weight="semibold" className="text-[1.375rem] mb-4">
          Grafik Nilai Tugas Rata-Rata
        </Title>
        <div className="flex flex-col items-center min-h-[180px]">
          <ChartTugasRata data={data} />
        </div>
      </Card>
    </div>
  )
}
