import { Card, CardSeparator, Text, Title } from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { totalPenggunaApi } from '@/services/api/instansi/dashboard/total-pengguna'
import { makeSimpleQueryData } from '@/utils/query-data'
import { angka } from '@/utils/text'
import { useQuery } from '@tanstack/react-query'
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts'

const COLORS = ['#00B929', '#DCDCDC']

export default function DashboardTotalPenggunaCard() {
  const { jwt } = useSessionJwt()

  const { data } = useQuery({
    queryKey: ['instansi.dashboard.total-pengguna'],
    queryFn: makeSimpleQueryData(totalPenggunaApi, jwt),
  })

  const chartData = [
    { name: 'Kuota Tersedia', value: data?.tersedia ?? 0 },
    {
      name: 'Kuota Digunakan',
      value: data?.digunakan ?? 0,
    },
  ]

  return (
    <Card className="flex flex-col w-full p-0">
      <div className="flex p-2">
        <Title as="h4" weight="semibold">
          Total Pengguna
        </Title>
      </div>
      <CardSeparator />
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart className="[&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-white">
            <Pie
              data={chartData}
              cornerRadius={40}
              innerRadius={90}
              outerRadius={110}
              paddingAngle={10}
              startAngle={360 - 35}
              endAngle={-35}
              fill="#BFDBFE"
              stroke="rgba(0,0,0,0)"
              dataKey="value"
            >
              <Label
                width={30}
                position="center"
                content={
                  <CustomLabel data={chartData.map((item) => item.value)} />
                }
              ></Label>
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="px-4 pb-4">
        {chartData.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between border-b border-muted pb-3 mb-3 last:mb-0 last:border-0 last:pb-0"
          >
            <div className="flex items-center justify-start">
              <span
                className="me-2 h-2 w-2 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <Text
                as="span"
                className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700"
              >
                {item.name}
              </Text>
            </div>
            <Text as="span">{angka(item.value)}</Text>
          </div>
        ))}
      </div>
    </Card>
  )
}

function CustomLabel(props: any) {
  const { cx, cy } = props.viewBox
  return (
    <>
      <text
        x={cx}
        y={cy - 10}
        fill="#000000"
        className="recharts-text recharts-label font-semibold"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan alignmentBaseline="middle" fontSize="16px">
          {angka(props.data[1])} pengguna
        </tspan>
      </text>
      <text
        x={cx}
        y={cy + 10}
        fill="#000000"
        className="recharts-text recharts-label font-semibold"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan fontSize="16px">
          dari {angka(props.data[0] + props.data[1])} kuota
        </tspan>
      </text>
    </>
  )
}
