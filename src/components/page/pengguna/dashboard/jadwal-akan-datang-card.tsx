import { tableJadwalAkanDatangAction } from '@/actions/pengguna/dashboard/table-jadwal-akan-datang'
import {
  Button,
  Card,
  CardSeparator,
  TableHeaderCell,
  Text,
  Title,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { routes } from '@/config/routes'
import { useTableAsync } from '@/hooks/use-table-async'
import cn from '@/utils/class-names'
import Image from 'next/image'
import Link from 'next/link'
import { ColumnsType } from 'rc-table'

export default function JadwalAkanDatangCard({
  className,
}: {
  className?: string
}) {
  const { data, isLoading, isFetching } = useTableAsync({
    queryKey: ['pengguna.dashboard.table-kelas-akan-datang'],
    action: tableJadwalAkanDatangAction,
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: <TableHeaderCell title="Nama Kelas" />,
      dataIndex: 'kelas',
      render: (value: string, row) => (
        <div className="flex items-center space-x-2">
          <Image
            src={row.image}
            alt="profil"
            className="w-10 h-10 rounded-md object-cover"
            width={100}
            height={100}
          />
          <Text size="sm" weight="semibold" variant="dark">
            {value}
          </Text>
        </div>
      ),
    },
    {
      title: <TableHeaderCell title="Hari dan Tanggal" />,
      dataIndex: 'tanggal',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark">
          {value}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Jam" />,
      dataIndex: 'jam',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark">
          {value}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Instansi" />,
      dataIndex: 'instansi',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark">
          {value}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      render: (_: string, row) => {
        return (
          <Link
            href={`${routes.pengguna.kelas}`}
            className="flex justify-center"
          >
            <Button variant="text-colorful">Masuk Kelas</Button>
          </Link>
        )
      },
    },
  ]

  return (
    <Card className={cn(className)}>
      <Title as="h4" weight="semibold" className="p-2">
        Jadwal Kelas Akan Datang
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
