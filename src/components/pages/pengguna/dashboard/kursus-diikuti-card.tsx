import {
  Button,
  Card,
  CardSeparator,
  TableHeaderCell,
  Text,
  Title,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { useTableAsync } from '@/hooks/use-table-async'
import { tableKursusDiikutiApi } from '@/services/api/pengguna/dashboard/table-kursus-diikuti'
import cn from '@/utils/class-names'
import Image from 'next/image'
import { ColumnsType } from 'rc-table'

export default function KursusDiikutiCard({
  className,
}: {
  className?: string
}) {
  const { data, isLoading, isFetching } = useTableAsync({
    queryKey: ['pengguna.dashboard.table-kursus-diikuti'],
    action: tableKursusDiikutiApi,
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: <TableHeaderCell title="Nama Kursus" />,
      dataIndex: 'nama',
      render: (value: string, row) => (
        <div className="flex items-center gap-x-2">
          <Image
            src={row.image}
            alt="cover"
            className="size-10 rounded-md object-cover"
            width={128}
            height={128}
          />
          <Text size="sm" weight="semibold" variant="dark">
            {value}
          </Text>
        </div>
      ),
    },
    {
      title: <TableHeaderCell title="Total Modul" />,
      dataIndex: 'modul',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark">
          {value} Modul
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Progress" />,
      dataIndex: 'progress',
      render: (value: string, row) => (
        <Text size="sm" weight="medium" variant="dark">
          {value}/{row.progress} Modul
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Creator" />,
      dataIndex: 'creator',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark">
          {value}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      render: () => {
        return (
          <div className="flex justify-center">
            <Button variant="text-colorful">Mulai Belajar</Button>
          </div>
        )
      },
    },
  ]

  return (
    <Card className={cn(className)}>
      <Title as="h4" weight="semibold" className="p-2">
        Kursus yang Anda Ikuti
      </Title>

      <CardSeparator />

      <ControlledAsyncTable
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        columns={tableColumns}
        rowKey={(row) => row.id}
        variant="elegant"
      />
    </Card>
  )
}
