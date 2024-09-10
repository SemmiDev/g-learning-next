import { tableRiwayatPembayaranAction } from '@/actions/instansi/dashboard/table-riwayat-pembayaran'
import {
  ActionIconTooltip,
  Card,
  CardSeparator,
  getSortDirection,
  TableCellText,
  TableHeaderCell,
  Time,
  Title,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { renderTableCellTextCenter } from '@/components/ui/table'
import { useTableAsync } from '@/hooks/use-table-async'
import cn from '@/utils/class-names'
import { angka } from '@/utils/text'
import { ColumnsType } from 'rc-table'
import { LuDownload } from 'react-icons/lu'

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
    action: tableRiwayatPembayaranAction,
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: (
        <TableHeaderCell
          title="Tanggal"
          sortable
          sort={getSortDirection(sort, 'tanggal_pembayaran')}
        />
      ),
      dataIndex: 'tanggal_pembayaran',
      render: (value: string) => (
        <TableCellText>
          <Time date={value} />
        </TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('tanggal_pembayaran')
        },
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
          title="Biaya (Rp)"
          align="center"
          sortable
          sort={getSortDirection(sort, 'nominal')}
        />
      ),
      dataIndex: 'nominal',
      render: (value: number) => (
        <TableCellText align="center">{angka(value)}</TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('nominal')
        },
      }),
    },
    {
      title: <TableHeaderCell title="No. Invoice" align="center" />,
      dataIndex: 'nomor_invoice',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Invoice" align="center" />,
      width: 70,
      render: (_, row) => (
        <div className="flex justify-center">
          <ActionIconTooltip
            tooltip="Unduh"
            size="sm"
            variant="text-colorful"
            color="primary"
          >
            <LuDownload />
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
        Riwayat Pembayaran
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
