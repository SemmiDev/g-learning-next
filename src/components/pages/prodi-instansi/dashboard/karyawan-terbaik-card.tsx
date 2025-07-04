import {
  Card,
  renderTableCellNumber,
  renderTableCellText,
  TableCellText,
  TableHeaderCell,
  Title,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import cn from '@/utils/class-names'
import { ColumnsType } from 'rc-table'
import { PiStarFill } from 'react-icons/pi'

type DashboardKaryawanTerbaikCardProps = {
  className?: string
}

export default function DashboardKaryawanTerbaikCard({
  className,
}: DashboardKaryawanTerbaikCardProps) {
  const data = [
    {
      id: 1,
      pegawai: 'Pegawai 1',
      poin: 95.95,
    },
    {
      id: 2,
      pegawai: 'Pegawai 2',
      poin: 92.72,
    },
    {
      id: 3,
      pegawai: 'Pegawai 3',
      poin: 91.05,
    },
    {
      id: 4,
      pegawai: 'Pegawai 4',
      poin: 89.3,
    },
    {
      id: 5,
      pegawai: 'Pegawai 5',
      poin: 88.25,
    },
  ]

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: <TableHeaderCell title="#" align="center" />,
      width: 50,
      render: renderTableCellNumber,
    },
    {
      title: <TableHeaderCell title="Pegawai" />,
      dataIndex: 'pegawai',
      render: renderTableCellText,
    },
    {
      title: <TableHeaderCell title="Poin" />,
      dataIndex: 'poin',

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
        // isLoading={isLoading}
        // isFetching={isFetching}
        columns={tableColumns}
        rowKey={(row) => row.id}
        // paginatorOptions={{
        //   current: page,
        //   pageSize: perPage,
        //   total: totalData,
        //   onChange: (page) => onPageChange(page),
        //   paginatorClassName: 'p-2',
        // }}
        variant="elegant"
      />
    </Card>
  )
}
