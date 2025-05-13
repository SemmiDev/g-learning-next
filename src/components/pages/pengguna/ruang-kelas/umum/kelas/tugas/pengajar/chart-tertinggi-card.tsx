import { Card, Title } from '@/components/ui'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartData } from './chart-section'

type PengajarChartTugasTertinggiCardProps = {
  className?: string
  data: ChartData[]
}

export default function PengajarChartTugasTertinggiCard({
  className,
  data,
}: PengajarChartTugasTertinggiCardProps) {
  return (
    <div className={className}>
      <Card>
        <Title as="h4" size="1.5xl" weight="semibold" className="mb-4">
          Grafik Nilai Tugas Tertinggi
        </Title>
        <div className="flex flex-col items-center min-h-[180px]">
          <PengajarChartTugasTertinggi data={data} />
        </div>
      </Card>
    </div>
  )
}

function PengajarChartTugasTertinggi({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar name="Nilai" dataKey="value" fill="#2563EB" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  )
}
