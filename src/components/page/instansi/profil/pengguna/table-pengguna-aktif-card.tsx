'use client'

import { tablePenggunaAction } from '@/actions/instansi/profil/pengguna/table'
import { ActionIconTooltip, Card, CardSeparator, Title } from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import {
  getSortDirection,
  renderTableCellText,
  renderTableCellTextCenter,
  TableCellText,
  TableHeaderCell,
} from '@/components/ui/table'
import { useTableAsync } from '@/hooks/use-table-async'
import { fileSizeToKB, formatBytes } from '@/utils/bytes'
import { angka } from '@/utils/text'
import { ColumnsType } from 'rc-table'
import { useState } from 'react'
import { LuEye } from 'react-icons/lu'
import LihatModal from './modal/lihat'

export default function TablePenggunaAktifCard() {
  const [idLihat, setIdLihat] = useState<string>()

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
    queryKey: ['instansi.profil.pengguna.table'],
    action: tablePenggunaAction,
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
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
            onClick={() => setIdLihat(row.id)}
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
            pageSize: 10,
            current: page,
            total: totalData,
            onChange: (page) => onPageChange(page),
          }}
        />
      </Card>

      <LihatModal id={idLihat} setId={setIdLihat} />
    </>
  )
}
