import { hapusInstansiAction } from '@/actions/admin/instansi/hapus'
import { tableInstansiAction } from '@/actions/admin/instansi/table'
import {
  ActionIconTooltip,
  Card,
  getSortDirection,
  ModalConfirm,
  renderTableCellText,
  TableHeaderCell,
  Time,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { renderTableCellTextCenter, TableCellText } from '@/components/ui/table'
import { routes } from '@/config/routes'
import { useHandleDelete } from '@/hooks/handle/use-handle-delete'
import { useTableAsync } from '@/hooks/use-table-async'
import { fileSizeToKB, formatBytes } from '@/utils/bytes'
import Link from 'next/link'
import { ColumnsType } from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { LuEye, LuTrash } from 'react-icons/lu'
import UbahModal from './modal/ubah'

const queryKey = ['admin.instansi.table'] as const

export default function TableInstansiCard() {
  const [idUbah, setIdUbah] = useState<string | undefined>()

  const {
    handle: handleHapus,
    id: idHapus,
    setId: setIdHapus,
  } = useHandleDelete({
    action: hapusInstansiAction,
    refetchKey: queryKey,
  })

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
    queryKey,
    action: tableInstansiAction,
  })

  const tableColumns: ColumnsType<DefaultRecordType> = [
    {
      title: (
        <TableHeaderCell
          title="Nama Instansi"
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
      dataIndex: 'nama_paket',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Jumlah Pengguna" align="center" />,
      dataIndex: 'jumlah_pengguna',
      render: (value: number, row: any) => (
        <TableCellText align="center">
          {value}/{row.batas_pengguna}
        </TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="Jumlah Penyimpanan" align="center" />,
      dataIndex: 'jumlah_penyimpanan_terpakai',
      render: (value: number, row: any) => (
        <TableCellText align="center">
          {formatBytes(fileSizeToKB(value, 'MB'))}/
          {formatBytes(fileSizeToKB(row.batas_penyimpanan, 'MB'))}
        </TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="Jumlah Kelas" align="center" />,
      dataIndex: 'jumlah_kelas',
      render: (value: number, row: any) => (
        <TableCellText align="center">
          {value}/{row.batas_kelas}
        </TableCellText>
      ),
    },
    {
      title: (
        <TableHeaderCell
          title="Tanggal Jatuh Tempo"
          align="center"
          sortable
          sort={getSortDirection(sort, 'jatuh_tempo')}
        />
      ),
      dataIndex: 'jatuh_tempo',
      render: (value: string) => (
        <TableCellText align="center">
          <Time date={value} />
        </TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('jatuh_tempo')
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
              tooltip="Detail"
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
            pageSize: 10,
            current: page,
            total: totalData,
            onChange: (page) => onPageChange(page),
          }}
        />
      </Card>

      <UbahModal id={idUbah} setId={setIdUbah} />

      <ModalConfirm
        title="Hapus Instansi"
        desc="Apakah Anda yakin ingin menghapus instansi ini dari database?"
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
