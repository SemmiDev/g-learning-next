import { Cell, Pie, PieChart } from 'recharts'

export type PesertaChartPersentaseKehadiranData = {
  name: string
  value: number
}

type PesertaChartPersentaseKehadiranProps = {
  data: PesertaChartPersentaseKehadiranData[]
  colors: string[]
}

export default function PesertaChartPersentaseKehadiran({
  data,
  colors,
}: PesertaChartPersentaseKehadiranProps) {
  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        innerRadius={50}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((_, idx) => (
          <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}
