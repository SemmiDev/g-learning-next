import { Card, Title } from '@/components/ui'
import dynamic from 'next/dynamic'
import { ChartTertinggiData } from './chart-tertinggi'

const ChartTugasTertinggi = dynamic(() => import('./chart-tertinggi'), {
  ssr: false,
})

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
        <Title as="h4" weight="semibold" className="text-[1.375rem] mb-4">
          Grafik Nilai Tugas Tertinggi
        </Title>
        <div className="flex flex-col items-center min-h-[180px]">
          <ChartTugasTertinggi data={data} />
        </div>
      </Card>
    </div>
  )
}
