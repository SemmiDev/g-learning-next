import {
  DataType,
  tableJatuhTempoAction,
} from '@/actions/admin/dashboard/table-jatuh-tempo'
import {
  ActionIcon,
  Card,
  CardSeparator,
  renderTableCellText,
  TableHeaderCell,
  Time,
  Title,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import {
  getSortOrder,
  renderTableCellTextCenter,
  TableCellText,
} from '@/components/ui/table'
import { useTableAsync } from '@/hooks/use-table-async'
import cn from '@/utils/class-names'
import { ColumnsType } from 'rc-table'
import { useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import UbahJatuhTempoModal from './modal/ubah-jatuh-tempo'

type DashboardJatuhTempoCardProps = {
  className?: string
}

export default function DashboardJatuhTempoCard({
  className,
}: DashboardJatuhTempoCardProps) {
  const [ubahJatuhTempo, setUbahJatuhTempo] = useState<DataType | undefined>()

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
    queryKey: ['admin.dashboard.table-jatuh-tempo'],
    action: tableJatuhTempoAction,
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: <TableHeaderCell title="Nama Instansi" />,
      dataIndex: 'nama',
      render: renderTableCellText,
    },
    {
      title: <TableHeaderCell title="Paket" align="center" />,
      dataIndex: 'paket',
      render: renderTableCellTextCenter,
    },
    {
      title: (
        <TableHeaderCell
          title="Tangal Jatuh Tempo"
          align="center"
          sortable
          sort={getSortOrder(sort, 'jatuh_tempo')}
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
      render: (_, row) => (
        <div className="flex justify-center">
          <ActionIcon
            size="sm"
            variant="text-colorful"
            color="warning"
            onClick={() => setUbahJatuhTempo(row)}
          >
            <BsPencilSquare />
          </ActionIcon>
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
          Jatuh Tempo Pembayaran
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
            searchClassName: 'w-72 sm:w-96',
            onSearchClear: () => onSearch(''),
            onSearchChange: (e) => onSearch(e.target.value),
          }}
          paginatorOptions={{
            current: page,
            pageSize: perPage,
            total: totalData,
            onChange: (page) => onPageChange(page),
          }}
          className="[&_.rc-table-container]:!border-0 [&_.rc-table-cell]:px-2 [&_th.rc-table-cell]:py-2 [&_td.rc-table-cell]:py-1 [&_th.rc-table-cell]:bg-gray-50/40 [&_.rc-table-cell]:border [&_.rc-table-cell]:!border-muted lg:min-h-[410px]"
        />
      </Card>

      <UbahJatuhTempoModal
        jatuhTempo={ubahJatuhTempo}
        setJatuhTempo={setUbahJatuhTempo}
      />
    </>
  )
}
