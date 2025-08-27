import {
  Card,
  CardSeparator,
  getSortOrder,
  TableCellText,
  TableHeaderCell,
  Time,
  Title,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { renderTableCellTextCenter } from '@/components/ui/table'
import { useTableAsync } from '@/hooks/use-table-async'
import { tableRiwayatPembayaranApi } from '@/services/api/instansi/dashboard/table-riwayat-pembayaran'
import cn from '@/utils/class-names'
import { angka } from '@/utils/text'
import { ColumnsType } from 'rc-table'

export default function DashboardRiwayatPembayaranCard({
  className,
}: {
  className?: string
}) {
  const {
    data,
    isLoading,
    isFetching,
    page,
    perPage,
    onPageChange,
    totalData,
    sort,
    onSort,
    search,
    onSearch,
  } = useTableAsync({
    queryKey: ['instansi.dashboard.table-riwayat-pembayaran'],
    action: tableRiwayatPembayaranApi,
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: (
        <TableHeaderCell
          title="Tanggal"
          sortable
          sort={getSortOrder(sort, 'tanggal_pembayaran')}
        />
      ),
      dataIndex: 'tanggal_pembayaran',
      render: (value: string) => (
        <TableCellText>
          <Time date={value} />
        </TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => onSort('tanggal_pembayaran'),
      }),
    },
    {
      title: <TableHeaderCell title="Jenis Paket" align="center" />,
      dataIndex: 'nama_paket',
      render: renderTableCellTextCenter,
    },
    {
      title: (
        <TableHeaderCell
          title="Nominal Pembayaran (Rp)"
          align="center"
          sortable
          sort={getSortOrder(sort, 'jumlah_pembayaran')}
        />
      ),
      dataIndex: 'jumlah_pembayaran',
      render: (value: number) => (
        <TableCellText align="center">{angka(value)}</TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => onSort('jumlah_pembayaran'),
      }),
    },
    {
      title: (
        <TableHeaderCell
          title="No. Pembayaran"
          align="center"
          sortable
          sort={getSortOrder(sort, 'nomor_pembayaran')}
        />
      ),
      dataIndex: 'nomor_pembayaran',
      render: renderTableCellTextCenter,
      onHeaderCell: () => ({
        onClick: () => onSort('nomor_pembayaran'),
      }),
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
        Riwayat Pembayaran
      </Title>
      <CardSeparator />
      <ControlledAsyncTable
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        columns={tableColumns}
        rowKey={(row) => row.id_pembayaran}
        filterOptions={{
          searchTerm: search,
          searchSize: 'sm',
          onSearchClear: () => onSearch(''),
          onSearchChange: (e) => onSearch(e.target.value),
          className: 'p-2',
        }}
        paginatorOptions={{
          current: page,
          pageSize: perPage,
          total: totalData,
          onChange: (page) => onPageChange(page),
          paginatorClassName: 'p-2',
        }}
        className="[&_.rc-table-cell]:px-2 [&_th.rc-table-cell]:py-2 [&_td.rc-table-cell]:py-1"
      />
    </Card>
  )
}
