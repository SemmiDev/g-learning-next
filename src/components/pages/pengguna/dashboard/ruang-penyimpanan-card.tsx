import {
  Button,
  Card,
  CardSeparator,
  PustakaMediaDriveType,
  Text,
  Title,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { driveInfoApi } from '@/services/api/shared/pustaka-media/drive-info'
import { formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { Dropdown } from 'rizzui'

const COLORS = ['#BFDBFE', '#0070F3']
const queryKeyDrive = ['shared.pustaka-media.drives']

type DashboardRuangPenyimpananCardProps = {
  className?: string
}

export default function DashboardRuangPenyimpananCard({
  className,
}: DashboardRuangPenyimpananCardProps) {
  const { processApi } = useSessionJwt()

  const [activeDrive, setActiveDrive] = useState<string>('PERSONAL')

  const { data: drives = [] } = useQuery<PustakaMediaDriveType[]>({
    queryKey: queryKeyDrive,
    queryFn: async () => {
      const { data } = await processApi(driveInfoApi)

      const personal = data?.media_personal_info
      const instansi = data?.daftar_media_instansi_info ?? []
      const googleDrive = data?.media_google_drive_info

      return [
        {
          id: 'PERSONAL',
          name: 'Personal',
          size: personal?.kuota_total_in_kb ?? 0,
          used: personal?.kuota_terpakai_in_kb ?? 0,
        },
        ...instansi.map((item) => ({
          id: item.id_instansi,
          name: `${item.nama_instansi}`,
          size: item.kuota_total_in_kb,
          used: item.kuota_terpakai_in_kb,
        })),
        ...(!!googleDrive
          ? [
              {
                id: 'GOOGLE_DRIVE',
                name: 'Google Drive',
                size: googleDrive?.kuota_total_in_kb ?? 0,
                used: googleDrive?.kuota_terpakai_in_kb ?? 0,
                active: !!googleDrive,
              },
            ]
          : []),
      ]
    },
  })

  const currentDrive = drives.find((item) => item.id === activeDrive)
  const data = [
    {
      name: 'Penyimpanan Tersedia',
      value: currentDrive ? currentDrive?.size - currentDrive?.used : 0,
    },
    { name: 'Total Digunakan', value: currentDrive?.used ?? 0 },
  ]

  return (
    <Card className={cn('flex flex-col w-full p-0 lg:w-5/12', className)}>
      <div className="flex justify-between items-center p-2">
        <Title as="h4" weight="semibold">
          Ruang Penyimpanan
        </Title>
        <Dropdown>
          <Dropdown.Trigger>
            <Button as="span" size="sm" variant="outline">
              {drives.filter((item) => item.id === activeDrive)[0]?.name}{' '}
              <BsChevronDown className="ml-2 w-5" />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            {drives.map((drive) => (
              <Dropdown.Item
                key={drive.id ?? 'personal'}
                className="justify-between"
                onClick={() => setActiveDrive(drive.id ?? null)}
              >
                <Text size="sm">{drive.name}</Text>{' '}
                {drive.id === activeDrive ? <BsCheck size={18} /> : null}
              </Dropdown.Item>
            ))}
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
