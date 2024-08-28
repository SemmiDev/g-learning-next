import { hapusAdminAction } from '@/actions/admin/admin/hapus'
import { tableAdminAction } from '@/actions/admin/admin/table'
import {
  ActionIconTooltip,
  Card,
  getSortDirection,
  ModalConfirm,
  renderTableCellText,
  TableCellText,
  TableHeaderCell,
  Time,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { useHandleDelete } from '@/hooks/handle/use-handle-delete'
import { useTableAsync } from '@/hooks/use-table-async'
import { ColumnsType } from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { LuEye, LuTrash } from 'react-icons/lu'
import LihatModal from './modal/lihat'
import UbahModal from './modal/ubah'

const queryKey = ['admin.manajemen-admin.table'] as const

export default function TableAdminCard() {
  const [idLihat, setIdLihat] = useState<string>()
  const [idUbah, setIdUbah] = useState<string>()

  const {
    handle: handleHapus,
    id: idHapus,
    setId: setIdHapus,
  } = useHandleDelete({
    action: hapusAdminAction,
    refetchKey: queryKey,
  })

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
    queryKey,
    action: tableAdminAction,
  })

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
      title: (
        <TableHeaderCell
          title="Username"
          sortable
          sort={getSortDirection(sort, 'username')}
        />
      ),
      dataIndex: 'username',
      render: renderTableCellText,
      onHeaderCell: () => ({
        onClick: () => {
          onSort('username')
        },
      }),
    },
    {
      title: (
        <TableHeaderCell
          title="Terakhir Login"
          sortable
          sort={getSortDirection(sort, 'terakhir_login')}
        />
      ),
      dataIndex: 'terakhir_login',
      render: (value: string) => (
        <TableCellText>
          <Time date={value} format="datetime" empty="-" seconds />
        </TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('terakhir_login')
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
            onClick={() => setIdLihat(row.id)}
          >
            <LuEye />
          </ActionIconTooltip>
          <ActionIconTooltip
            tooltip="Ubah"
            size="sm"
            variant="text-colorful"
            color="warning"
            onClick={() => setIdUbah(row.id)}
          >
            <BsPencilSquare />
          </ActionIconTooltip>
          <ActionIconTooltip
            tooltip="Hapus"
            size="sm"
            variant="text-colorful"
            color="danger"
            onClick={() => setIdHapus(row.id)}
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
            current: page,
            pageSize: perPage,
            total: totalData,
            onChange: (page) => onPageChange(page),
          }}
        />
      </Card>

      <UbahModal id={idUbah} setId={setIdUbah} />
      <LihatModal id={idLihat} setId={setIdLihat} />

      <ModalConfirm
        title="Hapus Admin"
        desc="Apakah Anda yakin ingin menghapus admin ini dari database?"
        color="danger"
        isOpen={!!idHapus}
        onClose={() => setIdHapus(undefined)}
        onConfirm={handleHapus}
        headerIcon="warning"
        closeOnCancel
      />
    </>
  )
}
