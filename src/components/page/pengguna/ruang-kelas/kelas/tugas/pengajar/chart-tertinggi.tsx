import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export type ChartTertinggiData = {
  name: string
  value: number
}

export default function ChartTugasTertinggi({
  data,
}: {
  data: ChartTertinggiData[]
}) {
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
