import { hapusPembayaranInstansiAction } from '@/actions/admin/pembayaran-instansi/hapus'
import { tablePembayaranInstansiAction } from '@/actions/admin/pembayaran-instansi/table'
import {
  ActionIconTooltip,
  Badge,
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
import { useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { LuEye, LuTrash } from 'react-icons/lu'
import LihatModal from './modal/lihat'
import UbahModal from './modal/ubah'
import { renderTableCellTextCenter } from '@/components/ui/table'
import { rupiah } from '@/utils/text'

const queryKey = ['admin.pembayaran-instansi.table'] as const

export default function TablePembayaranInstansiCard() {
  const [idLihat, setIdLihat] = useState<string>()
  const [idUbah, setIdUbah] = useState<string>()

  const {
    handle: handleHapus,
    id: idHapus,
    setId: setIdHapus,
  } = useHandleDelete({
    action: hapusPembayaranInstansiAction,
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
    action: tablePembayaranInstansiAction,
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: (
        <TableHeaderCell
          title="Nama Instansi"
          sortable
          sort={getSortDirection(sort, 'nama_instansi')}
        />
      ),
      dataIndex: 'nama_instansi',
      render: renderTableCellText,
      onHeaderCell: () => ({
        onClick: () => {
          onSort('nama_instansi')
        },
      }),
    },
    {
      title: (
        <TableHeaderCell
          title="Tanggal Pembayaran"
          align="center"
          sortable
          sort={getSortDirection(sort, 'tanggal_pembayaran')}
        />
      ),
      dataIndex: 'tanggal_pembayaran',
      render: (value: string) => (
        <TableCellText align="center">
          <Time date={value} empty="-" />
        </TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('tanggal_pembayaran')
        },
      }),
    },
    {
      title: <TableHeaderCell title="Jenis Paket" />,
      dataIndex: 'nama_paket',
      render: renderTableCellTextCenter,
    },
    {
      title: (
        <TableHeaderCell
          title="Nominal"
          align="center"
          sortable
          sort={getSortDirection(sort, 'nominal')}
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
      title: <TableHeaderCell title="No. Pesanan" align="center" />,
      dataIndex: 'nomor_pesanan',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="No. Invoice" align="center" />,
      dataIndex: 'nomor_invoice',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Status" />,
      dataIndex: 'status',
      render: (value: string) => (
        <TableCellText align="center">
          <Badge
            variant="flat"
            color={value === 'Lunas' ? 'success' : 'danger'}
          >
            {value}
          </Badge>
        </TableCellText>
      ),
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
            onClick={() => setIdLihat(row.id)}
          >
            <LuEye />
          </ActionIconTooltip>
          {row.status !== 'Lunas' && (
            <ActionIconTooltip
              tooltip="Ubah"
              size="sm"
              variant="text-colorful"
              color="warning"
              onClick={() => setIdUbah(row.id)}
            >
              <BsPencilSquare />
            </ActionIconTooltip>
          )}
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

      <UbahModal id={idUbah} setId={setIdUbah} />
      <LihatModal id={idLihat} setId={setIdLihat} />

      <ModalConfirm
        title="Hapus Pembayaran Instansi"
        desc="Apakah Anda yakin ingin menghapus invoice pembayaran ini?"
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
