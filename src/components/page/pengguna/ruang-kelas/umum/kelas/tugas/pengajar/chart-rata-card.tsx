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

type PengajarChartTugasRataCardProps = {
  className?: string
  data: ChartData[]
}

export default function PengajarChartTugasRataCard({
  className,
  data,
}: PengajarChartTugasRataCardProps) {
  return (
    <div className={className}>
      <Card>
        <Title as="h4" size="1.5xl" weight="semibold" className="mb-4">
          Grafik Nilai Tugas Rata-Rata
        </Title>
        <div className="flex flex-col items-center min-h-[180px]">
          <PengajarChartTugasRata data={data} />
        </div>
      </Card>
    </div>
  )
}

function PengajarChartTugasRata({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar name="Nilai" dataKey="value" fill="#29EB25" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  )
}
