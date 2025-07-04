'use client'

import { ActionIconTooltip, Card, CardSeparator, Title } from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import {
  getSortOrder,
  renderTableCellText,
  renderTableCellTextCenter,
  TableCellText,
  TableHeaderCell,
} from '@/components/ui/table'
import { useShowModal } from '@/hooks/use-show-modal'
import { useTableAsync } from '@/hooks/use-table-async'
import { tablePenggunaApi } from '@/services/api/prodi-instansi/profil-instansi/pengguna/table'
import { fileSizeToKB, formatBytes } from '@/utils/bytes'
import { angka } from '@/utils/text'
import { ColumnsType } from 'rc-table'
import { LuEye } from 'react-icons/lu'
import LihatModal from './modal/lihat'

export default function TablePenggunaAktifCard() {
  const {
    show: showLihat,
    key: keyLihat,
    doShow: doShowLihat,
    doHide: doHideLihat,
  } = useShowModal<string>()

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
    queryKey: ['prodi-instansi.profil-instansi.pengguna.table'],
    action: tablePenggunaApi,
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: (
        <TableHeaderCell
          title="Nama Pengguna"
          sortable
          sort={getSortOrder(sort, 'nama')}
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
      dataIndex: 'jenis_akun',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Jumlah Penyimpanan" align="center" />,
      dataIndex: 'jumlah_penyimpanan',
      render: (value: number, row) => (
        <TableCellText align="center">
          {formatBytes(value)}/
          {formatBytes(fileSizeToKB(row.batas_penyimpanan, 'MB'))}
        </TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="Jumlah Kelas" align="center" />,
      dataIndex: 'jumlah_kelas',
      render: (value: number, row) => (
        <TableCellText align="center">
          {angka(value)}/{angka(row.batas_kelas)}
        </TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      className: 'action',
      width: 70,
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

      <LihatModal show={showLihat} id={keyLihat} onHide={doHideLihat} />
    </>
  )
}
