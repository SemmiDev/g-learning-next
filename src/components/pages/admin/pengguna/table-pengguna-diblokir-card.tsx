import {
  ActionIconTooltip,
  Card,
  CardSeparator,
  getSortOrder,
  renderTableCellText,
  TableHeaderCell,
  Time,
  Title,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { TableCellText } from '@/components/ui/table'
import { useShowModal } from '@/hooks/use-show-modal'
import { useTableAsync } from '@/hooks/use-table-async'
import { tablePenggunaDiblokirApi } from '@/services/api/admin/pengguna/table-diblokir'
import { ColumnsType } from 'rc-table'
import { LuEye } from 'react-icons/lu'
import LihatDiblokirModal from './modal/lihat-diblokir'

export default function TablePenggunaDiblokirCard() {
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
    queryKey: ['admin.pengguna.table-diblokir'],
    action: tablePenggunaDiblokirApi,
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
        onClick: () => onSort('nama'),
      }),
    },
    {
      title: <TableHeaderCell title="Jenis Akun" align="center" />,
      dataIndex: 'jenis_akun',
      render: (value: string[]) => (
        <TableCellText align="center">
          {value.length ? value.join(', ') : '-'}
        </TableCellText>
      ),
    },
    {
      title: (
        <TableHeaderCell
          title="Tanggal/Waktu Blokir"
          align="center"
          sortable
          sort={getSortOrder(sort, 'tanggal_blokir')}
        />
      ),
      dataIndex: 'tanggal_blokir',
      render: (value: string) => (
        <TableCellText align="center">
          <Time date={value} format="datetime" />
        </TableCellText>
      ),
      onHeaderCell: () => ({
        onClick: () => onSort('tanggal_blokir'),
      }),
    },
    {
      title: <TableHeaderCell title="Keterangan" align="center" />,
      dataIndex: 'keterangan_blokir',
      render: (value: string) => (
        <TableCellText align="center">{value || '-'}</TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
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
          Pengguna yang Diblokir
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

      <LihatDiblokirModal show={showLihat} id={keyLihat} onHide={doHideLihat} />
    </>
  )
}
