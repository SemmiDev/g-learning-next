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
import { renderTableCellTextCenter, TableCellText } from '@/components/ui/table'
import { useTableAsync } from '@/hooks/use-table-async'
import { fileSizeToKB, formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import { angka } from '@/utils/text'
import { ColumnsType } from 'rc-table'
import { useState } from 'react'
import { LuEye } from 'react-icons/lu'
import LihatModal from '../profil/pengguna/modal/lihat'

export default function DashboardPenggunaCard({
  className,
}: {
  className?: string
}) {
  const [idLihat, setIdLihat] = useState<string>()

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
      render: renderTableCellText,
      onHeaderCell: () => ({
        onClick: () => {
          onSort('nama')
        },
      }),
    },
    {
      title: <TableHeaderCell title="Jenis Akun" align="center" />,
      dataIndex: 'jenis_akun',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Jumlah Kelas" align="center" />,
      dataIndex: 'jumlah_kelas',
      render: (value: number, row) => (
        <TableCellText align="center">
          {angka(value)}/{angka(row.batas_kelas)}
        </TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="Jumlah Penyimpanan (GB)" align="center" />,
      dataIndex: 'jumlah_penyimpanan',
      render: (value: number, row) => (
        <TableCellText align="center">
          {formatBytes(value)}/
          {formatBytes(fileSizeToKB(row.batas_penyimpanan, 'MB'))}
        </TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      render: (_, row) => (
        <div className="flex justify-center">
          <ActionIconTooltip
            tooltip="Lihat"
            size="sm"
            variant="text-colorful"
            color="info"
            onClick={() => setIdLihat(row.id)}
          >
            <LuEye />
          </ActionIconTooltip>
        </div>
      ),
    },
  ]

  return (
    <>
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
            current: page,
            pageSize: perPage,
            total: totalData,
            onChange: (page) => onPageChange(page),
            paginatorClassName: 'p-2',
          }}
          className="[&_.rc-table-cell]:px-2 [&_th.rc-table-cell]:py-2 [&_td.rc-table-cell]:py-1"
        />
      </Card>

      <LihatModal id={idLihat} setId={setIdLihat} />
    </>
  )
}
