import { Card, CardSeparator, Title } from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { chartPenggunaanPaketPenggunaApi } from '@/services/api/admin/dashboard/chart-penggunaan-paket-pengguna'
import cn from '@/utils/class-names'
import { useQuery } from '@tanstack/react-query'
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts'
import SimpleBar from 'simplebar-react'

const COLORS = ['#2563EB', '#F1416C', '#00D42F', '#BEBEBE'] as const

type ChartDataType = {
  name: string
  count: number
  fill: string
}

type ChartType = {
  list: ChartDataType[]
  max: number
}

type DashboardPenggunaanPaketPenggunaCardProps = {
  className?: string
}

export default function DashboardPenggunaanPaketPenggunaCard({
  className,
}: DashboardPenggunaanPaketPenggunaCardProps) {
  const { processApi } = useSessionJwt()

  const { data = { list: [], max: 0 } } = useQuery<ChartType>({
    queryKey: ['admin.dashboard.penggunaan-paket-pengguna'],
    queryFn: async () => {
      const { data } = await processApi(chartPenggunaanPaketPenggunaApi)

      const list: ChartDataType[] =
        data?.list.map((item, idx) => ({
          name: item.nama_paket,
          count: item.total,
          fill: COLORS[idx % COLORS.length],
        })) ?? []

      const max = Math.max(...(data?.list.map((item) => item.total) ?? []))

      return {
        list,
        max,
      }
    },
  })

  return (
    <Card className={cn('p-0', className)}>
      <Title as="h4" size="1.5xl" weight="semibold" className="p-2">
        Penggunaan Paket Pengguna
      </Title>
      <CardSeparator />
      <div className="flex flex-col items-center gap-x-4 px-2 md:flex-row">
        <SimpleBar className="w-3/5">
          <div className="flex h-60 w-full justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="35%"
                outerRadius="100%"
                barSize={12}
                data={data.list.slice().reverse()}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, data.max]}
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
        <CustomLegend data={data.list} className="flex-1 shrink-0" />
      </div>
    </Card>
  )
}

function CustomLegend({
  data,
  className,
}: {
  data: ChartDataType[]
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
