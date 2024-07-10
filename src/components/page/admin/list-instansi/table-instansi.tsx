import { tableInstansiAction } from '@/actions/admin/list-instansi/table-instansi'
import {
  ActionIcon,
  Card,
  getSortDirection,
  ModalConfirm,
  renderTableCellText,
  TableCellText,
  TableHeaderCell,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { useTableAsync } from '@/hooks/use-table-async'
import { useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { LuEye, LuTrash } from 'react-icons/lu'

export default function TableInstansiCard() {
  const [showModalHapus, setShowModalHapus] = useState<number | null>(null)

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
  } = useTableAsync(tableInstansiAction, {
    nama: '',
    email: '',
  })

  const tableColumns = [
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
      title: <TableHeaderCell title="Paket" align="center" />,
      dataIndex: 'paket',
      render: (value: any) => (
        <TableCellText align="center">{value}</TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="Jumlah Pengguna" align="center" />,
      dataIndex: 'jumlahPengguna',
      render: (value: any) => (
        <TableCellText align="center">{value}</TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="Jumlah Penyimpanan" align="center" />,
      dataIndex: 'jumlahPenyimpanan',
      render: (value: any) => (
        <TableCellText align="center">{value}</TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="Jumlah Kelas" align="center" />,
      dataIndex: 'jumlahKelas',
      render: (value: any) => (
        <TableCellText align="center">{value}</TableCellText>
      ),
    },
    {
      title: (
        <TableHeaderCell
          title="Tanggal Jatuh Tempo"
          align="center"
          sortable
          sort={getSortDirection(sort, 'jatuhTempo')}
        />
      ),
      dataIndex: 'jatuhTempo',
      render: (value: any) => (
        <TableCellText align="center">{value}</TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('jatuhTempo')
        },
      }),
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      className: 'action',
      render: (_: any, row: any) => (
        <div className="flex justify-center">
          <ActionIcon size="sm" variant="text-colorful" color="success">
            <LuEye />
          </ActionIcon>
          <ActionIcon size="sm" variant="text-colorful" color="warning">
            <BsPencilSquare />
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant="text-colorful"
            color="danger"
            onClick={() => setShowModalHapus(row.id)}
          >
            <LuTrash />
          </ActionIcon>
        </div>
      ),
    },
  ]

  return (
    <>
      <Card className="p-0">
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

      <ModalConfirm
        title="Hapus Instansi"
        desc="Apakah Anda yakin ingin menghapus instansi ini dari database?"
        color="danger"
        isOpen={!!showModalHapus}
        onClose={() => setShowModalHapus(null)}
        onCancel={() => setShowModalHapus(null)}
        onConfirm={() => setShowModalHapus(null)}
      />
    </>
  )
}
