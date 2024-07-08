import { Card, CardSeparator, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts'
import SimpleBar from 'simplebar-react'

type ChartDataType = {
  name: string
  count: number
  fill: string
}

export default function DashboardPenggunaanPaketPenggunaCard() {
  const data: ChartDataType[] = [
    {
      name: 'Advance',
      count: 80,
      fill: '#2563EB',
    },
    {
      name: 'Premium',
      count: 100,
      fill: '#F1416C',
    },
    {
      name: 'Basic',
      count: 132,
      fill: '#00D42F',
    },
    {
      name: 'Lainnya',
      count: 40,
      fill: '#BEBEBE',
    },
  ]

  return (
    <Card className="p-0">
      <Title as="h4" size="1.5xl" weight="semibold" className="p-2">
        Penggunaan Paket Pengguna
      </Title>
      <CardSeparator />
      <div className="flex items-center gap-4 px-2">
        <SimpleBar className="w-3/5">
          <div className="flex h-60 w-full justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="35%"
                outerRadius="100%"
                barSize={12}
                data={data.slice().reverse()}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 150]}
                  dataKey={'count'}
                  tick={false}
                />
                <RadialBar
                  dataKey="count"
                  className=" [&_.recharts-radial-bar-background-sector]:fill-gray-100"
                  cornerRadius={20}
                  background
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </SimpleBar>
        <CustomLegend data={data} className="flex-1 shrink-0" />
      </div>
    </Card>
  )
}

function CustomLegend({
  data,
  className,
}: {
  data: any[]
  className?: string
}) {
  return (
    <div className={cn('flex flex-col flex-wrap gap-3 py-4', className)}>
      {data.map((item) => (
        <div
          key={item.name}
          className="flex flex-col relative flex-1 ps-6 text-gray-500"
        >
          <span
            className="absolute start-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded"
            style={{ backgroundColor: item?.fill }}
          />
          {item.name}
          <span className="font-inter text-xl font-semibold text-gray-900">
            {item.count} Pengguna
          </span>
        </div>
      ))}
    </div>
  )
}
