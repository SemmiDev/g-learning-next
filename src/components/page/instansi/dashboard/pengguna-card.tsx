import { tablePenggunaAction } from '@/actions/instansi/dashboard/table-pengguna'
import {
  ActionIconTooltip,
  Card,
  CardSeparator,
  getSortDirection,
  renderTableCellText,
  TableHeaderCell,
  Title,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { renderTableCellTextCenter } from '@/components/ui/table'
import { useTableAsync } from '@/hooks/use-table-async'
import cn from '@/utils/class-names'
import { ColumnsType } from 'rc-table'
import { LuEye } from 'react-icons/lu'

export default function DashboardPenggunaCard({
  className,
}: {
  className?: string
}) {
  const {
    data,
    isLoading,
    isFetching,
    page,
    onPageChange,
    totalData,
    sort,
    onSort,
    search,
    onSearch,
  } = useTableAsync({
    queryKey: ['instansi.dashboard.table-pengguna'],
    action: tablePenggunaAction,
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: (
        <TableHeaderCell
          title="Nama"
          sortable
          sort={getSortDirection(sort, 'nama')}
        />
      ),
      dataIndex: 'nama',
      key: 'nama',
      render: renderTableCellText,
      onHeaderCell: () => ({
        onClick: () => {
          onSort('nama')
        },
      }),
    },
    {
      title: <TableHeaderCell title="Jenis Akun" align="center" />,
      dataIndex: 'jenis',
      key: 'jenis',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Jumlah Kelas" align="center" />,
      dataIndex: 'jumlahKelas',
      key: 'jumlahKelas',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Jumlah Penyimpanan (GB)" align="center" />,
      dataIndex: 'penyimpanan',
      key: 'penyimpanan',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      render: (_: any, row) => (
        <div className="flex justify-center">
          <ActionIconTooltip
            tooltip="Lihat"
            size="sm"
            variant="text-colorful"
            color="info"
          >
            <LuEye />
          </ActionIconTooltip>
        </div>
      ),
    },
  ]

  return (
    <Card className={cn('p-0', className)}>
      <Title
        as="h4"
        size="1.5xl"
        weight="semibold"
        variant="dark"
        className="m-2"
      >
        Daftar Pengguna
      </Title>
      <CardSeparator />
      <ControlledAsyncTable
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        columns={tableColumns}
        rowKey={(row) => row.id}
        filterOptions={{
          searchTerm: search,
          searchSize: 'sm',
          onSearchClear: () => onSearch(''),
          onSearchChange: (e) => onSearch(e.target.value),
          className: 'p-2',
        }}
        paginatorOptions={{
          pageSize: 5,
          current: page,
          total: totalData,
          onChange: (page) => onPageChange(page),
          paginatorClassName: 'p-2',
        }}
        className="[&_.rc-table-cell]:px-2 [&_th.rc-table-cell]:py-2 [&_td.rc-table-cell]:py-1"
      />
    </Card>
  )
}
