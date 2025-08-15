import {
  ActionIconTooltip,
  Card,
  getSortOrder,
  ModalConfirm,
  renderTableCellText,
  TableCellText,
  TableHeaderCell,
  Time,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { useHandleApiDelete } from '@/hooks/handle/use-handle-delete'
import { useShowModal } from '@/hooks/use-show-modal'
import { useTableAsync } from '@/hooks/use-table-async'
import { hapusAdminApi } from '@/services/api/admin/admin/hapus'
import { tableAdminApi } from '@/services/api/admin/admin/table'
import { ColumnsType } from 'rc-table'
import { BsPencilSquare } from 'react-icons/bs'
import { LuEye, LuTrash } from 'react-icons/lu'
import LihatModal from './modal/lihat'
import UbahModal from './modal/ubah'

const queryKey = ['admin.manajemen-admin.table'] as const

export default function TableAdminCard() {
  const {
    show: showLihat,
    key: keyLihat,
    doShow: doShowLihat,
    doHide: doHideLihat,
  } = useShowModal<string>()
  const {
    show: showUbah,
    key: keyUbah,
    doShow: doShowUbah,
    doHide: doHideUbah,
  } = useShowModal<string>()

  const {
    handle: handleHapus,
    id: idHapus,
    setId: setIdHapus,
  } = useHandleApiDelete({
    action: hapusAdminApi,
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
    action: tableAdminApi,
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: (
        <TableHeaderCell
          title="Nama Lengkap"
          sortable
          sort={getSortOrder(sort, 'nama')}
        />
      ),
      dataIndex: 'nama',
      render: renderTableCellText,
      onHeaderCell: () => ({
        onClick: () => onSort('nama'),
      }),
    },
    {
      title: (
        <TableHeaderCell
          title="Username"
          sortable
          sort={getSortOrder(sort, 'username')}
        />
      ),
      dataIndex: 'username',
      render: renderTableCellText,
      onHeaderCell: () => ({
        onClick: () => onSort('username'),
      }),
    },
    {
      title: (
        <TableHeaderCell
          title="Terakhir Login"
          sortable
          sort={getSortOrder(sort, 'terakhir_login')}
        />
      ),
      dataIndex: 'terakhir_login',
      render: (value: string) => (
        <TableCellText>
          <Time date={value} format="datetime" empty="-" seconds />
        </TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => onSort('terakhir_login'),
      }),
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      className: 'action',
      width: 100,
      render: (_, row) => (
        <div className="flex justify-center">
          <ActionIconTooltip
            tooltip="Lihat"
            size="sm"
            variant="text-colorful"
            color="info"
            onClick={() => doShowLihat(row.id)}
          >
            <LuEye />
          </ActionIconTooltip>
          <ActionIconTooltip
            tooltip="Ubah"
            size="sm"
            variant="text-colorful"
            color="warning"
            onClick={() => doShowUbah(row.id)}
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

      <UbahModal show={showUbah} id={keyUbah} onHide={doHideUbah} />
      <LihatModal show={showLihat} id={keyLihat} onHide={doHideLihat} />

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
