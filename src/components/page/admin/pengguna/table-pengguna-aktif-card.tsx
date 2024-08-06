import { tablePenggunaAktifAction } from '@/actions/admin/pengguna/table-pengguna-aktif'
import {
  ActionIconTooltip,
  Badge,
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
import { ColumnsType } from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { useState } from 'react'
import { LuEye } from 'react-icons/lu'
import LihatModal from './modal/lihat'

export default function TablePenggunaAktifCard() {
  const [showModalLihat, setShowModalLihat] = useState<number>()

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
  } = useTableAsync(tablePenggunaAktifAction)

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
      title: <TableHeaderCell title="Instansi" align="center" />,
      dataIndex: 'instansi',
      render: (value: string, row: any) => (
        <div className="flex justify-center items-center space-x-1">
          <TableCellText>{value}</TableCellText>
          {!!row.instansiMore && (
            <Badge size="sm" variant="flat" color="gray">
              +{row.instansiMore}
            </Badge>
          )}
        </div>
      ),
    },
    {
      title: <TableHeaderCell title="Jenis Akun" align="center" />,
      dataIndex: 'jenis',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      className: 'action',
      width: 70,
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
        <Title as="h4" size="1.5xl" weight="semibold" className="mx-2.5 my-2">
          Pengguna yang Aktif
        </Title>
        <CardSeparator />
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

      <LihatModal showModal={showModalLihat} setShowModal={setShowModalLihat} />
    </>
  )
}
