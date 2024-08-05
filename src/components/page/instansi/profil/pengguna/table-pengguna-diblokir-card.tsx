'use client'

import { tablePenggunaDiblokirAction } from '@/actions/admin/pengguna/table-pengguna-diblokir'
import {
  ActionIconTooltip,
  Card,
  CardSeparator,
  getSortDirection,
  renderTableCellText,
  TableHeaderCell,
  Time,
  Title,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { renderTableCellTextCenter, TableCellText } from '@/components/ui/table'
import { useTableAsync } from '@/hooks/use-table-async'
import { ColumnsType } from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { useState } from 'react'
import { LuEye } from 'react-icons/lu'
import LihatDiblokirModal from './modal/lihat-diblokir'

export default function TablePenggunaDiblokirCard() {
  const [showModalLihat, setShowModalLihat] = useState<number | null>()

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
  } = useTableAsync(tablePenggunaDiblokirAction)

  const tableColumns: ColumnsType<DefaultRecordType> = [
    {
      title: (
        <TableHeaderCell
          title="Nama Pengguna"
          sortable
          sort={getSortDirection(sort, 'nama')}
        />
      ),
      dataIndex: 'nama',
      key: 'nama',
      render: renderTableCellText,
      onHeaderCell: () => ({
        onClick: () => {
          onSort('nama')
        },
      }),
    },
    {
      title: <TableHeaderCell title="Jenis Akun" align="center" />,
      dataIndex: 'jenis',
      key: 'jenis',
      render: renderTableCellTextCenter,
    },
    {
      title: (
        <TableHeaderCell
          title="Tanggal/Waktu Blokir"
          align="center"
          sortable
          sort={getSortDirection(sort, 'waktuBlokir')}
        />
      ),
      dataIndex: 'waktuBlokir',
      key: 'waktuBlokir',
      render: (value: string) => (
        <TableCellText align="center">
          <Time date={value} format="datetime" />
        </TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => {
          onSort('waktuBlokir')
        },
      }),
    },
    {
      title: <TableHeaderCell title="Keterangan" align="center" />,
      dataIndex: 'keterangan',
      key: 'keterangan',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      width: 70,
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
        </div>
      ),
    },
  ]

  return (
    <>
      <Card className="p-0">
        <Title as="h4" size="1.5xl" weight="semibold" className="mx-2.5 my-2">
          Pengguna yang Diblokir
        </Title>
        <CardSeparator />
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
            pageSize: 5,
            current: page,
            total: totalData,
            onChange: (page) => onPageChange(page),
          }}
        />
      </Card>

      <LihatDiblokirModal
        showModal={showModalLihat}
        setShowModal={setShowModalLihat}
      />
    </>
  )
}
