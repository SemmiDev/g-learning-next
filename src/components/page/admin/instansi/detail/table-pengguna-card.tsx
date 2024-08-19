import { tablePenggunaAction } from '@/actions/admin/instansi/table-pengguna'
import {
  ActionIconTooltip,
  Card,
  getSortDirection,
  renderTableCellText,
  TableHeaderCell,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { renderTableCellTextCenter } from '@/components/ui/table'
import { useTableAsync } from '@/hooks/use-table-async'
import { ColumnsType } from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { useState } from 'react'
import { LuEye } from 'react-icons/lu'
import LihatModal from './modal/lihat'

export default function TablePenggunaCard() {
  const [showModalLihat, setShowModalLihat] = useState<number | undefined>()

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
    key: ['admin.instansi.detail.table'],
    action: tablePenggunaAction,
  })

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
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Jumlah Penyimpanan" align="center" />,
      dataIndex: 'penyimpanan',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Jumlah Kelas" align="center" />,
      dataIndex: 'kelas',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      className: 'action',
      width: 60,
      render: (_: any, row: any) => (
        <div className="flex justify-center">
          <ActionIconTooltip
            tooltip="Lihat"
            size="sm"
            variant="text-colorful"
            color="info"
            onClick={() => setShowModalLihat(row.id)}
          >
            <LuEye />
          </ActionIconTooltip>
        </div>
      ),
    },
  ]

  return (
    <>
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
            pageSize: 10,
            current: page,
            total: totalData,
            onChange: (page) => onPageChange(page),
          }}
        />
      </Card>

      <LihatModal showModal={showModalLihat} setShowModal={setShowModalLihat} />
    </>
  )
}
