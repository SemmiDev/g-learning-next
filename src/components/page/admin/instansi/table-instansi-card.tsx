import { tableInstansiAction } from '@/actions/admin/instansi/table-instansi'
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
import { routes } from '@/config/routes'
import { useTableAsync } from '@/hooks/use-table-async'
import Link from 'next/link'
import { useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { LuEye, LuTrash } from 'react-icons/lu'
import UbahModal from './modal/ubah'

export default function TableInstansiCard() {
  const [showModalUbah, setShowModalUbah] = useState<number | null>()
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
          <Link href={`${routes.admin.listInstansi}/detail`}>
            <ActionIconTooltip
              tooltip="Lihat"
              size="sm"
              variant="text-colorful"
              color="info"
            >
              <LuEye />
            </ActionIconTooltip>
          </Link>
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

      <UbahModal showModal={showModalUbah} setShowModal={setShowModalUbah} />

      <ModalConfirm
        title="Hapus Instansi"
        desc="Apakah Anda yakin ingin menghapus instansi ini dari database?"
        color="danger"
        isOpen={!!showModalHapus}
        onClose={() => setShowModalHapus(null)}
        onConfirm={() => setShowModalHapus(null)}
        headerIcon="help"
        closeOnCancel
      />
    </>
  )
}
