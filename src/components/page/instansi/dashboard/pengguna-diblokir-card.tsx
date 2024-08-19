import { tablePenggunaDiblokirAction } from '@/actions/instansi/dashboard/table-pengguna-diblokir'
import {
  ActionIconTooltip,
  Card,
  CardSeparator,
  getSortDirection,
  renderTableCellText,
  TableCellText,
  TableHeaderCell,
  Time,
  Title,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { renderTableCellTextCenter } from '@/components/ui/table'
import { useTableAsync } from '@/hooks/use-table-async'
import cn from '@/utils/class-names'
import { ColumnsType } from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { LuEye } from 'react-icons/lu'

export default function DashboardPenggunaDiblokirCard({
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
  } = useTableAsync(tablePenggunaDiblokirAction)

  const tableColumns: ColumnsType<DefaultRecordType> = [
    {
      title: (
        <TableHeaderCell
          title="Nama Pengguna"
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
      title: (
        <TableHeaderCell
          title="Tanggal/Waktu Blokir"
          align="center"
          sortable
          sort={getSortDirection(sort, 'waktuBlokir')}
        />
      ),
      dataIndex: 'waktuBlokir',
      key: 'waktuBlokir',
      render: (value: string) => (
        <TableCellText align="center">
          <Time date={value} format="datetime" />
        </TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('waktuBlokir')
        },
      }),
    },
    {
      title: <TableHeaderCell title="Keterangan" align="center" />,
      dataIndex: 'keterangan',
      key: 'keterangan',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      render: (_: any, row: any) => (
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
        Pengguna yang Diblokir
      </Title>
      <CardSeparator />
      <ControlledAsyncTable
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        columns={tableColumns}
        rowKey={(record) => record.id}
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
