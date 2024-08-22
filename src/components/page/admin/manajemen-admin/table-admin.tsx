import { tableAdminAction } from '@/actions/admin/admin/table-admin'
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
import { useTableAsync } from '@/hooks/use-table-async'
import { ColumnsType } from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { LuEye, LuTrash } from 'react-icons/lu'
import LihatModal from './modal/lihat'
import UbahModal from './modal/ubah'
import { handleActionWithToast } from '@/utils/action'
import { hapusAdminAction } from '@/actions/admin/admin/hapus-admin'

export default function TableAdminCard() {
  const [idLihat, setIdLihat] = useState<string>()
  const [idUbah, setIdUbah] = useState<string>()
  const [idHapus, setIdHapus] = useState<string>()

  const {
    data,
    isLoading,
    isFetching,
    refetch,
    page,
    perPage,
    onPageChange,
    totalData,
    sort,
    onSort,
    search,
    onSearch,
  } = useTableAsync({
    key: ['admin.manajemen-admin.table'],
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

  const handleHapus = () => {
    if (!idHapus) return

    handleActionWithToast(hapusAdminAction(idHapus), {
      loading: 'Menghapus...',
      onSuccess: () => {
        setIdHapus(undefined)
        refetch()
      },
    })
  }

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
        headerIcon="help"
        closeOnCancel
      />
    </>
  )
}
