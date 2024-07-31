import {
  ActionIcon,
  Button,
  Card,
  CardSeparator,
  Input,
  Pagination,
  renderTableCellText,
  Table,
  TableHeaderCell,
  Text,
  Title,
} from '@/components/ui'
import { renderTableCellTextCenter } from '@/components/ui/table'
import cn from '@/utils/class-names'
import { ColumnsType } from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { BsCheck, BsChevronDown, BsPencilSquare } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown } from 'rizzui'

export default function DashboardJatuhTempoCard({
  className,
}: {
  className?: string
}) {
  const tableColumns: ColumnsType<DefaultRecordType> = [
    {
      title: <TableHeaderCell title="Nama Instansi" />,
      dataIndex: 'instansi',
      key: 'instansi',
      render: renderTableCellText,
    },
    {
      title: <TableHeaderCell title="Paket" align="center" />,
      dataIndex: 'paket',
      key: 'paket',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Tangal Jatuh Tempo" align="center" />,
      dataIndex: 'jatuhTempo',
      key: 'jatuhTempo',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      render: (_: any, row: any) => (
        <div className="flex justify-center">
          <ActionIcon size="sm" variant="text-colorful">
            <BsPencilSquare />
          </ActionIcon>
        </div>
      ),
    },
  ]

  const tableData = [
    {
      id: 1,
      instansi: 'UIN SUSKA Riau',
      paket: 'Basic',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 2,
      instansi: 'Ganesha operation',
      paket: 'Premium',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 3,
      instansi: 'Garuda Cyber Intitute',
      paket: 'Basic',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 4,
      instansi: 'Politeknik Caltex Amerika',
      paket: 'Basic',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 5,
      instansi: 'Politeknik Caltex Amerika',
      paket: 'Basic',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 6,
      instansi: 'Politeknik Caltex Amerika',
      paket: 'Basic',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 7,
      instansi: 'Politeknik Caltex Amerika',
      paket: 'Basic',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 8,
      instansi: 'Politeknik Caltex Amerika',
      paket: 'Basic',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 9,
      instansi: 'Politeknik Caltex Amerika',
      paket: 'Basic',
      jatuhTempo: '12 Januari 2030',
    },
    {
      id: 10,
      instansi: 'Politeknik Caltex Amerika',
      paket: 'Basic',
      jatuhTempo: '12 Januari 2030',
    },
  ]

  return (
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
      <div className="flex justify-between space-x-2 p-2">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Instansi"
          clearable={true}
          className="w-72 sm:w-96"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
        />
        <Dropdown>
          <Dropdown.Trigger>
            <Button size="sm" variant="outline">
              Terbaru <BsChevronDown className="ml-2 w-5" />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item className="justify-between">
              <Text size="sm">Terbaru</Text> <BsCheck size={18} />
            </Dropdown.Item>
            <Dropdown.Item className="justify-between">
              <Text size="sm">Terlawas</Text>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="relative">
        <Table
          rowKey={(record) => record.id}
          columns={tableColumns}
          data={tableData}
          className="[&_.rc-table-container]:!border-0 [&_.rc-table-cell]:px-2 [&_th.rc-table-cell]:py-2 [&_td.rc-table-cell]:py-1 [&_th.rc-table-cell]:bg-gray-50/40 [&_.rc-table-cell]:border [&_.rc-table-cell]:!border-muted"
        />
      </div>
      <div className="flex justify-between items-center p-2">
        <Text size="2xs" variant="lighter">
          Menampilkan 10 dari 20 data
        </Text>
        <Pagination total={20} />
      </div>
    </Card>
  )
}
