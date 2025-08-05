import {
  Card,
  renderTableCellNumber,
  renderTableCellText,
  TableCellText,
  TableHeaderCell,
  Title,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { tableKaryawanTerbaikApi } from '@/services/api/prodi-instansi/dashboard/table-karyawan-terbaik'
import cn from '@/utils/class-names'
import { useQuery } from '@tanstack/react-query'
import { ColumnsType } from 'rc-table'
import { PiStarFill } from 'react-icons/pi'

const queryKey = ['prodi-instansi.dashboard.karyawan-terbaik']

type DashboardKaryawanTerbaikCardProps = {
  className?: string
}

export default function DashboardKaryawanTerbaikCard({
  className,
}: DashboardKaryawanTerbaikCardProps) {
  const { processApi } = useSessionJwt()

  const { data = [], isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await processApi(tableKaryawanTerbaikApi)

      return data?.list
    },
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: <TableHeaderCell title="#" align="center" />,
      width: 50,
      render: renderTableCellNumber,
    },
    {
      title: <TableHeaderCell title="Pegawai" />,
      dataIndex: 'nama',
      render: renderTableCellText,
    },
    {
      title: <TableHeaderCell title="Poin" />,
      dataIndex: 'total_poin',

      render: (value: number) => (
        <div className="flex items-center gap-x-1.5 shrink-0">
          <PiStarFill className="size-4 text-yellow-400" />
          <TableCellText>{value}</TableCellText>
        </div>
      ),
    },
  ]

  return (
    <Card className={cn('p-0', className)}>
      <div className="flex p-2">
        <Title as="h4" weight="semibold">
          Karwayan Terbaik
        </Title>
      </div>
      <ControlledAsyncTable
        data={data}
        isLoading={isLoading}
        columns={tableColumns}
        rowKey={(row) => row.id_pengguna}
        variant="elegant"
      />
    </Card>
  )
}
