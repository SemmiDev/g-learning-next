import { chartPenggunaanPenyimpananAction } from '@/actions/admin/dashboard/chart-penggunaan-penyimpanan'
import {
  Card,
  CardSeparator,
  Select,
  SelectOptionType,
  Text,
  Title,
} from '@/components/ui'
import { CustomTooltip } from '@/components/ui/chart/custom-tooltip'
import { formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import { selectOption } from '@/utils/object'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
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

const currentYear = new Date().getFullYear()

const optionsTahun: SelectOptionType<number>[] = [...Array(10)].map((_, idx) =>
  selectOption(currentYear - idx)
)

const formatBulan = (bulan: string) => {
  const short = bulan.substring(0, 3)
  if (short.toLowerCase() === 'agu') return 'Ags'
  return short
}

const CustomYAxisTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" className="fill-gray-500">
        {formatBytes(payload.value)}
      </text>
    </g>
  )
}

type ChartDataType = {
  month: string
  size: number
}

type DashboardPenggunaanPenyimpananCardProps = {
  className?: string
}

export default function DashboardPenggunaanPenyimpananCard({
  className,
}: DashboardPenggunaanPenyimpananCardProps) {
  const [tahun, setTahun] = useState(new Date().getFullYear())

  const { data = { list: [], total: 0 } } = useQuery({
    queryKey: ['admin.dashboard.penggunaan-penyimpanan', tahun],
    queryFn: async () => {
      const { data } = await chartPenggunaanPenyimpananAction(tahun)

      const list: ChartDataType[] =
        data?.list.map((item) => ({
          month: formatBulan(item.bulan),
          size: item.ukuran,
        })) ?? []

      const total = list.map((item) => item.size).reduce((a, b) => b + a, 0)

      return { list, total }
    },
  })

  return (
    <Card className={cn('p-0', className)}>
      <div className="flex flex-wrap justify-between items-center gap-2 p-2">
        <Title as="h4" size="1.5xl" weight="semibold">
          Penggunaan Penyimpanan
        </Title>
        <Select
          placeholder="Pilih Tahun"
          options={optionsTahun}
          onChange={(item) => {
            if (item?.value) setTahun(item?.value)
          }}
          defaultValue={selectOption(tahun)}
          className="flex-1"
        />
      </div>
      <CardSeparator />
      <div className="p-2">
        <div className="flex items-center gap-x-2">
          <Text size="sm" weight="medium" variant="lighter">
            Total penyimpanan
          </Text>
          <Text as="span" size="1.5xl" weight="semibold" variant="dark">
            {formatBytes(data.total)}
          </Text>
        </div>
        <SimpleBar>
          <div className="h-80 w-full pt-9">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.list}
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
                <Tooltip
                  content={
                    <CustomTooltip format={(value) => formatBytes(value)} />
                  }
                />
                <Bar dataKey="size" fill="#357AF6" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SimpleBar>
      </div>
    </Card>
  )
}
