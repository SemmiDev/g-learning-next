import { tableAdminAction } from '@/actions/admin/admin/table-admin'
import {
  ActionIconTooltip,
  Card,
  getSortDirection,
  ModalConfirm,
  renderTableCellText,
  TableCellText,
  TableHeaderCell,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { useTableAsync } from '@/hooks/use-table-async'
import { ColumnsType } from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { LuEye, LuTrash } from 'react-icons/lu'
import LihatModal from './modal/lihat'
import UbahModal from './modal/ubah'

export default function TableAdminCard() {
  const [showModalLihat, setShowModalLihat] = useState<number>()
  const [showModalUbah, setShowModalUbah] = useState<number>()
  const [showModalHapus, setShowModalHapus] = useState<number>()

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
  } = useTableAsync(tableAdminAction)

  const tableColumns: ColumnsType<DefaultRecordType> = [
    {
      title: (
        <TableHeaderCell
          title="Nama Lengkap"
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
      title: <TableHeaderCell title="Username" />,
      dataIndex: 'username',
      render: renderTableCellText,
    },
    {
      title: <TableHeaderCell title="Email" />,
      dataIndex: 'email',
      render: (value: string) => <TableCellText>{value || '-'}</TableCellText>,
    },
    {
      title: (
        <TableHeaderCell
          title="Last Login"
          sortable
          sort={getSortDirection(sort, 'lastLogin')}
        />
      ),
      dataIndex: 'lastLogin',
      render: renderTableCellText,
      onHeaderCell: () => ({
        onClick: () => {
          onSort('lastLogin')
        },
      }),
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      className: 'action',
      width: 100,
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
          <ActionIconTooltip
            tooltip="Ubah"
            size="sm"
            variant="text-colorful"
            color="warning"
            onClick={() => setShowModalUbah(row.id)}
          >
            <BsPencilSquare />
          </ActionIconTooltip>
          <ActionIconTooltip
            tooltip="Hapus"
            size="sm"
            variant="text-colorful"
            color="danger"
            onClick={() => setShowModalHapus(row.id)}
          >
            <LuTrash />
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

      <UbahModal showModal={showModalUbah} setShowModal={setShowModalUbah} />
      <LihatModal showModal={showModalLihat} setShowModal={setShowModalLihat} />

      <ModalConfirm
        title="Hapus Admin"
        desc="Apakah Anda yakin ingin menghapus admin ini dari database?"
        color="danger"
        isOpen={!!showModalHapus}
        onClose={() => setShowModalHapus(undefined)}
        onConfirm={() => setShowModalHapus(undefined)}
        headerIcon="help"
        closeOnCancel
      />
    </>
  )
}
