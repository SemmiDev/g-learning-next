import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export type ChartRataData = {
  name: string
  value: number
}

export default function ChartTugasRata({ data }: { data: ChartRataData[] }) {
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
