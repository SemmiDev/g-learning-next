import { Cell, Pie, PieChart } from 'recharts'

export type PengajarChartData = {
  name: string
  value: number
}

type PengajarChartPresensiProps = {
  data: PengajarChartData[]
  colors: string[]
}

export default function PengajarChartPresensi({
  data,
  colors,
}: PengajarChartPresensiProps) {
  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        innerRadius={45}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}
