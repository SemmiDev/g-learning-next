'use client'

import { tableRiwayatPembayaranAction } from '@/actions/instansi/profil/riwayat-pembayaran/table'
import { ActionIconTooltip, Card, TableHeaderCell, Time } from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import {
  getSortOrder,
  renderTableCellTextCenter,
  TableCellText,
} from '@/components/ui/table'
import { useTableAsync } from '@/hooks/use-table-async'
import { rupiah } from '@/utils/text'
import { ColumnsType } from 'rc-table'
import { LuDownload } from 'react-icons/lu'

const queryKey = ['instansi.profil.riwayat-pembayaran.table'] as const

export default function ProfilRiwayatPembayaranBody() {
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
    queryKey: queryKey,
    action: tableRiwayatPembayaranAction,
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
          title="Biaya"
          align="center"
          sortable
          sort={getSortOrder(sort, 'nominal')}
        />
      ),
      dataIndex: 'nominal',
      render: (value: number) => (
        <TableCellText align="center">{rupiah(value)}</TableCellText>
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
    <Card className="p-0">
      <ControlledAsyncTable
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        columns={tableColumns}
        rowKey={(row) => row.id}
        filterOptions={{
          searchTerm: search,
          onSearchClear: () => onSearch(''),
          onSearchChange: (e) => onSearch(e.target.value),
        }}
        paginatorOptions={{
          current: page,
          pageSize: perPage,
          total: totalData,
          onChange: (page) => onPageChange(page),
        }}
      />
    </Card>
  )
}
