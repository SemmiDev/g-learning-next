import { tablePenggunaDiblokirAction } from '@/actions/instansi/dashboard/table-pengguna-diblokir'
import {
  ActionIconTooltip,
  Card,
  CardSeparator,
  getSortOrder,
  renderTableCellText,
  TableCellText,
  TableHeaderCell,
  Time,
  Title,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { renderTableCellTextCenter } from '@/components/ui/table'
import { useShowModal } from '@/hooks/use-show-modal'
import { useTableAsync } from '@/hooks/use-table-async'
import cn from '@/utils/class-names'
import { ColumnsType } from 'rc-table'
import { LuEye } from 'react-icons/lu'
import LihatDiblokirModal from '../profil/pengguna/modal/lihat-diblokir'

export default function DashboardPenggunaDiblokirCard({
  className,
}: {
  className?: string
}) {
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
    queryKey: ['instansi.dashboard.table-pengguna-diblokir'],
    action: tablePenggunaDiblokirAction,
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
        onClick: () => {
          onSort('tanggal_blokir')
        },
      }),
    },
    {
      title: <TableHeaderCell title="Keterangan" align="center" />,
      dataIndex: 'keterangan_blokir',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
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
      <Card className={cn('p-0', className)}>
        <Title
          as="h4"
          size="1.5xl"
          weight="semibold"
          variant="dark"
          className="m-2"
        >
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
            searchSize: 'sm',
            onSearchClear: () => onSearch(''),
            onSearchChange: (e) => onSearch(e.target.value),
            className: 'p-2',
          }}
          paginatorOptions={{
            current: page,
            pageSize: perPage,
            total: totalData,
            onChange: (page) => onPageChange(page),
            paginatorClassName: 'p-2',
          }}
          className="[&_.rc-table-cell]:px-2 [&_th.rc-table-cell]:py-2 [&_td.rc-table-cell]:py-1"
        />
      </Card>

      <LihatDiblokirModal show={showLihat} id={keyLihat} onHide={doHideLihat} />
    </>
  )
}
