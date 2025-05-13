'use client'

import { tableRiwayatPembayaranAction } from '@/services/actions/instansi/profil/riwayat-pembayaran/table'
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
          title="Tanggal Pembayaran"
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
          title="Nominal Pembayaran"
          align="center"
          sortable
          sort={getSortOrder(sort, 'jumlah_pembayaran')}
        />
      ),
      dataIndex: 'jumlah_pembayaran',
      render: (value: number) => (
        <TableCellText align="center">{rupiah(value)}</TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('jumlah_pembayaran')
        },
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
        onClick: () => {
          onSort('nomor_pembayaran')
        },
      }),
    },
    {
      title: (
        <TableHeaderCell
          title="No. Tagihan"
          align="center"
          sortable
          sort={getSortOrder(sort, 'nomor_invoice')}
        />
      ),
      dataIndex: 'nomor_invoice',
      render: renderTableCellTextCenter,
      onHeaderCell: () => ({
        onClick: () => {
          onSort('nomor_invoice')
        },
      }),
    },
    /* {
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
    }, */
  ]

  return (
    <Card className="p-0">
      <ControlledAsyncTable
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        columns={tableColumns}
        rowKey={(row) => row.id_pembayaran}
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
