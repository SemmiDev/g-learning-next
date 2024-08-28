'use client'

import { tableRiwayatPembayaranAction } from '@/actions/instansi/profil/table-riwayat-pembayaran'
import { ActionIconTooltip, Card, Time } from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import {
  getSortDirection,
  renderTableCellTextCenter,
  TableCellText,
  TableHeaderCell,
} from '@/components/ui/table'
import { useTableAsync } from '@/hooks/use-table-async'
import { angka } from '@/utils/text'
import { ColumnsType } from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { LuDownload } from 'react-icons/lu'

export default function RiwayatPembayaranPage() {
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
    queryKey: ['instansi.profil.riwayat-pembayaran.table'],
    action: tableRiwayatPembayaranAction,
  })

  const tableColumns: ColumnsType<DefaultRecordType> = [
    {
      title: (
        <TableHeaderCell
          title="Tanggal"
          sortable
          sort={getSortDirection(sort, 'tanggal')}
        />
      ),
      dataIndex: 'tanggal',
      key: 'tanggal',
      render: (value: string) => (
        <TableCellText>
          <Time date={value} />
        </TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('tanggal')
        },
      }),
    },
    {
      title: <TableHeaderCell title="Jenis Paket" align="center" />,
      dataIndex: 'jenis',
      key: 'jenis',
      render: renderTableCellTextCenter,
    },
    {
      title: (
        <TableHeaderCell
          title="Biaya (Rp)"
          align="center"
          sortable
          sort={getSortDirection(sort, 'biaya')}
        />
      ),
      dataIndex: 'biaya',
      key: 'biaya',
      render: (value: number) => (
        <TableCellText align="center">{angka(value)}</TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('biaya')
        },
      }),
    },
    {
      title: <TableHeaderCell title="No. Invoice" align="center" />,
      dataIndex: 'invoice',
      key: 'invoice',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Invoice" align="center" />,
      width: 70,
      render: (_: any, row: any) => (
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
        rowKey={(record) => record.id}
        filterOptions={{
          searchTerm: search,
          onSearchClear: () => onSearch(''),
          onSearchChange: (e) => onSearch(e.target.value),
        }}
        paginatorOptions={{
          pageSize: 5,
          current: page,
          total: totalData,
          onChange: (page) => onPageChange(page),
        }}
      />
    </Card>
  )
}
