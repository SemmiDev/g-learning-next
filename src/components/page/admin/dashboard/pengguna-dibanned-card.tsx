import {
  ActionIcon,
  Button,
  Card,
  CardSeparator,
  Input,
  Pagination,
  Table,
  TableHeaderCell,
  Text,
  Title,
} from '@/components/ui'
import {
  renderTableCellText,
  renderTableCellTextCenter,
} from '@/components/ui/table'
import cn from '@/utils/class-names'
import { ColumnsType } from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { BsCheck, BsChevronDown, BsPencilSquare } from 'react-icons/bs'
import { LuEye, LuTrash } from 'react-icons/lu'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown } from 'rizzui'

export default function DashboardPenggunaDibannedCard({
  className,
}: {
  className?: string
}) {
  const tableColumns: ColumnsType<DefaultRecordType> = [
    {
      title: <TableHeaderCell title="Nama Pengguna" />,
      dataIndex: 'pengguna',
      key: 'pengguna',
      render: renderTableCellText,
    },
    {
      title: <TableHeaderCell title="Jenis Akun" align="center" />,
      dataIndex: 'level',
      key: 'level',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Instansi" align="center" />,
      dataIndex: 'instansi',
      key: 'instansi',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Waktu Banned" align="center" />,
      dataIndex: 'waktu',
      key: 'waktu',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Keterangan" align="center" />,
      dataIndex: 'keterangan',
      key: 'keterangan',
      render: renderTableCellTextCenter,
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      render: (_: any, row: any) => (
        <div className="flex justify-center">
          <ActionIcon size="sm" variant="text-colorful">
            <BsPencilSquare />
          </ActionIcon>
          <ActionIcon size="sm" variant="text-colorful" color="success">
            <LuEye />
          </ActionIcon>
          <ActionIcon size="sm" variant="text-colorful" color="danger">
            <LuTrash />
          </ActionIcon>
        </div>
      ),
    },
  ]

  const tableData = [
    {
      id: 1,
      pengguna: 'Terra diagtora',
      level: 'Pengajar',
      instansi: 'UIN SUSAH Brunei',
      waktu: '03 Desember 2022 | 13:00',
      keterangan: 'Akun Palsu',
    },
    {
      id: 2,
      pengguna: 'Terra diagtora',
      level: 'Siswa',
      instansi: 'Ganesa Operator',
      waktu: '03 Desember 2022 | 13:00',
      keterangan: 'Akun Palsu',
    },
    {
      id: 3,
      pengguna: 'Terra diagtora',
      level: 'Siswa',
      instansi: 'Politeknik Jerman',
      waktu: '03 Desember 2022 | 13:00',
      keterangan: 'Akun Palsu',
    },
    {
      id: 4,
      pengguna: 'Terra diagtora',
      level: 'Pengajar',
      instansi: 'English Third',
      waktu: '03 Desember 2022 | 13:00',
      keterangan: 'Menyebabkan Kekacauan',
    },
    {
      id: 5,
      pengguna: 'Terra diagtora',
      level: 'Pengajar',
      instansi: 'UI IT',
      waktu: '03 Desember 2022 | 13:00',
      keterangan: 'Akun Palsu',
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
        Pengguna yang Di-banned
      </Title>
      <CardSeparator />
      <div className="flex justify-between space-x-2 p-2">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Pengguna"
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
          rowKey={(row) => row.id}
          columns={tableColumns}
          data={tableData}
          className="[&_.rc-table-container]:!border-0 [&_.rc-table-cell]:px-2 [&_th.rc-table-cell]:py-2 [&_td.rc-table-cell]:py-1 [&_th.rc-table-cell]:bg-gray-50/40 [&_.rc-table-cell]:border [&_.rc-table-cell]:!border-muted"
        />
      </div>
      <div className="flex justify-between items-center p-2">
        <Text size="2xs" variant="lighter">
          Menampilkan 5 dari 10 data
        </Text>
        <Pagination total={20} />
      </div>
    </Card>
  )
}
