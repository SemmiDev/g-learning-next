import { Card, CardSeparator, Text, Title } from '@/components/ui'
import { CustomTooltip } from '@/components/ui/chart/custom-tooltip'
import cn from '@/utils/class-names'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import SimpleBar from 'simplebar-react'

const CustomYAxisTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" className="fill-gray-500">
        {`${payload.value}`}GB
      </text>
    </g>
  )
}

type ChartDataType = {
  month: string
  size: number
}

export default function DashboardPenggunaanPenyimpananCard({
  className,
}: {
  className?: string
}) {
  const data: ChartDataType[] = [
    {
      month: 'Jan',
      size: 50,
    },
    {
      month: 'Feb',
      size: 60,
    },
    {
      month: 'Mar',
      size: 80,
    },
    {
      month: 'Apr',
      size: 50,
    },
    {
      month: 'Mei',
      size: 100,
    },
    {
      month: 'Jun',
      size: 30,
    },
    {
      month: 'Jul',
      size: 80,
    },
    {
      month: 'Ags',
      size: 80,
    },
    {
      month: 'Sep',
      size: 50,
    },
    {
      month: 'Okt',
      size: 90,
    },
    {
      month: 'Nov',
      size: 120,
    },
    {
      month: 'Des',
      size: 50,
    },
  ]

  return (
    <Card className={cn('p-0', className)}>
      <Title as="h4" size="1.5xl" weight="semibold" className="p-2">
        Penggunaan Paket Pengguna
      </Title>
      <CardSeparator />
      <div className="p-2">
        <Text size="sm" weight="medium" variant="lighter">
          Total penyimpanan
        </Text>
        <SimpleBar>
          <div className="h-80 w-full pt-9">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ left: 16 }}
                className="[&_.recharts-tooltip-cursor]:fill-opacity-20 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
              >
                <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={<CustomYAxisTick />}
                />
                <Tooltip content={<CustomTooltip suffix="GB" />} />
                <Bar dataKey="size" fill="#357AF6" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SimpleBar>
      </div>
    </Card>
  )
}
