import { tablePenggunaAction } from '@/actions/admin/list-instansi/table-pengguna'
import {
  ActionIconTooltip,
  Card,
  getSortDirection,
  renderTableCellText,
  TableCellText,
  TableHeaderCell,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { routes } from '@/config/routes'
import { useTableAsync } from '@/hooks/use-table-async'
import Link from 'next/link'
import { LuEye } from 'react-icons/lu'

export default function TablePenggunaCard() {
  const {
    data,
    isFirstLoading,
    isLoading,
    page,
    onPageChange,
    totalData,
    sort,
    onSort,
    search,
    onSearch,
  } = useTableAsync(tablePenggunaAction, {
    nama: '',
    email: '',
  })

  const tableColumns = [
    {
      title: (
        <TableHeaderCell
          title="Nama Pengguna"
          sortable
          sort={getSortDirection(sort, 'nama')}
        />
      ),
      dataIndex: 'nama',
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
      render: (value: any) => (
        <TableCellText align="center">{value}</TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="Jumlah Penyimpanan" align="center" />,
      dataIndex: 'penyimpanan',
      render: (value: any) => (
        <TableCellText align="center">{value}</TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="Jumlah Kelas" align="center" />,
      dataIndex: 'kelas',
      render: (value: any) => (
        <TableCellText align="center">{value}</TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      className: 'action',
      render: (_: any, row: any) => (
        <div className="flex justify-center">
          <Link href={`${routes.admin.listInstansi}/pengguna/detail`}>
            <ActionIconTooltip
              tooltip="Lihat"
              size="sm"
              variant="text-colorful"
              color="info"
            >
              <LuEye />
            </ActionIconTooltip>
          </Link>
        </div>
      ),
    },
  ]

  return (
    <Card className="p-0">
      <ControlledAsyncTable
        data={data}
        isFirstLoading={isFirstLoading}
        isLoading={isLoading}
        columns={tableColumns}
        rowKey={(record) => record.id}
        filterOptions={{
          searchTerm: search,
          onSearchClear: () => onSearch(''),
          onSearchChange: (e) => onSearch(e.target.value),
        }}
        paginatorOptions={{
          pageSize: 10,
          current: page,
          total: totalData,
          onChange: (page) => onPageChange(page),
        }}
      />
    </Card>
  )
}
