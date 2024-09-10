import { Button, Card, CardSeparator, Text, Title } from '@/components/ui'
import { fileSizeToKB, formatBytes } from '@/utils/bytes'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { Dropdown } from 'rizzui'

export default function DashboardRuangPenyimpananCard() {
  const data = [
    {
      name: 'Penyimpanan Tersedia',
      value: fileSizeToKB(1, 'GB') - fileSizeToKB(310, 'MB'),
    },
    { name: 'Total Digunakan', value: fileSizeToKB(310, 'MB') },
  ]
  const COLORS = ['#BFDBFE', '#0070F3']

  return (
    <Card className="flex flex-col w-full p-0 lg:w-5/12">
      <div className="flex justify-between items-center p-2">
        <Title as="h4" weight="semibold">
          Ruang Penyimpanan
        </Title>
        <Dropdown>
          <Dropdown.Trigger>
            <Button as="span" size="sm" variant="outline">
              Personal <BsChevronDown className="ml-2 w-5" />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item className="justify-between">
              <Text size="sm">Personal</Text> <BsCheck size={18} />
            </Dropdown.Item>
            <Dropdown.Item className="justify-between">
              <Text size="sm">UIN SUSKA Riau</Text>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <CardSeparator />
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart className="[&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-white">
            <Pie
              data={data}
              cornerRadius={40}
              innerRadius={100}
              outerRadius={120}
              paddingAngle={10}
              startAngle={105}
              endAngle={360 + 105}
              fill="#BFDBFE"
              stroke="rgba(0,0,0,0)"
              dataKey="value"
            >
              <Label
                width={30}
                position="center"
                content={<CustomLabel data={data.map((item) => item.value)} />}
              ></Label>
              {data.map((_, index) => (
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
        {data.map((item, index) => (
          <div
            key={item.name}
            className="mb-4 flex items-center justify-between border-b border-muted pb-4 last:mb-0 last:border-0 last:pb-0"
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
            <Text as="span">{formatBytes(item.value)}</Text>
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
        y={cy - 20}
        fill="#000000"
        className="recharts-text recharts-label font-semibold"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan alignmentBaseline="middle" fontSize="16px">
          {formatBytes(props.data[1])}
        </tspan>
      </text>
      <text
        x={cx}
        y={cy + 5}
        fill="#000000"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan fontSize="16px">digunakan dari</tspan>
      </text>
      <text
        x={cx}
        y={cy + 30}
        fill="#000000"
        className="recharts-text recharts-label font-semibold"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan fontSize="16px">
          {formatBytes(props.data[0] + props.data[1])}
        </tspan>
      </text>
    </>
  )
}
