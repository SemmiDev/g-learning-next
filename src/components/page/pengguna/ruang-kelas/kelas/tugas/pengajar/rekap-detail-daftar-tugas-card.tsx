import {
  ActionIcon,
  ActionIconTooltip,
  Card,
  CardSeparator,
  Input,
  Pagination,
  Table,
  TableHeaderCell,
  Text,
  Title,
} from '@/components/ui'
import Button from '@/components/ui/button/button'
import { routes } from '@/config/routes'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import Link from 'next/link'
import { ColumnsType } from 'rc-table'
import { BiFilterAlt } from 'react-icons/bi'
import {
  BsCheck,
  BsChevronDown,
  BsPencil,
  BsThreeDotsVertical,
  BsTrash3,
} from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown } from 'rizzui'

type PengajarRekapTugasDaftarAbsensiCardProps = {
  className?: string
}

export default function PengajarRekapTugasDaftarAbsensiCard({
  className,
}: PengajarRekapTugasDaftarAbsensiCardProps) {
  const tableData = [
    {
      id: 1,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      tanggal: '15 Des 24',
      jam: '15 : 36',
      nilai: null,
    },
    {
      id: 2,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      tanggal: '15 Des 24',
      jam: '15 : 36',
      nilai: null,
    },
    {
      id: 3,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      tanggal: '15 Des 24',
      jam: '15 : 36',
      nilai: null,
    },
    {
      id: 4,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      tanggal: '15 Des 24',
      jam: '15 : 36',
      nilai: null,
    },
    {
      id: 5,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      tanggal: '15 Des 24',
      jam: '15 : 36',
      nilai: 92,
    },
    {
      id: 6,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      tanggal: '15 Des 24',
      jam: '15 : 36',
      nilai: 91,
    },
    {
      id: 7,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      tanggal: '15 Des 24',
      jam: '15 : 36',
      nilai: 89,
    },
    {
      id: 8,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      tanggal: '15 Des 24',
      jam: '15 : 36',
      nilai: 89,
    },
    {
      id: 9,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      tanggal: '15 Des 24',
      jam: '15 : 36',
      nilai: 86,
    },
    {
      id: 10,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      tanggal: '15 Des 24',
      jam: '15 : 36',
      nilai: 81,
    },
  ]

  const tableColumns: ColumnsType<(typeof tableData)[number]> = [
    {
      title: <TableHeaderCell title="No" className="justify-center" />,
      dataIndex: 'no',
      key: 'no',
      render: (_: string, __, idx: number) => (
        <Text size="sm" weight="medium" variant="dark" className="text-center">
          {idx + 1}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Nama Peserta" />,
      dataIndex: 'nama',
      key: 'nama',
      render: (_: string, row) => (
        <div className="flex space-x-3">
          <Image src={row.image} alt="profil" className="size-10 rounded-md" />
          <div className="flex flex-col justify-center">
            <Text size="sm" weight="semibold" variant="dark">
              {row.nama}
            </Text>
            <Text
              size="2xs"
              weight="medium"
              variant="lighter"
              className="mt-0.5"
            >
              {row.email}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: <TableHeaderCell title="Waktu Pengumpulan" />,
      dataIndex: 'tanggal',
      key: 'tanggal',
      render: (_: string, row) => (
        <Text size="sm" weight="medium" variant="dark">
          {row.tanggal}
          <br />
          {row.jam}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Nilai" className="justify-center" />,
      dataIndex: 'nilai',
      key: 'nilai',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark" className="text-center">
          {value ?? '-'}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="" />,
      dataIndex: 'nilai',
      key: 'nilai',
      render: (_: string, row) => {
        if (row.nilai != null) {
          return (
            <div className="flex justify-end">
              <Dropdown placement="bottom-end">
                <Dropdown.Trigger>
                  <ActionIcon as="span" size="sm" variant="outline">
                    <BsThreeDotsVertical size={14} />
                  </ActionIcon>
                </Dropdown.Trigger>
                <Dropdown.Menu className="divide-y">
                  <div className="mb-2">
                    <Dropdown.Item className="text-gray-dark">
                      <BsPencil className="text-warning mr-2 h-4 w-4" />
                      Ubah Nilai
                    </Dropdown.Item>
                  </div>
                  <div className="mt-2 pt-2">
                    <Dropdown.Item className="text-gray-dark">
                      <BsTrash3 className="text-danger mr-2 h-4 w-4" />
                      Hapus Nilai
                    </Dropdown.Item>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )
        }

        return (
          <Link href={`${routes.pengguna.ruangKelas}/tugas/detail`}>
            <Button
              as="span"
              size="sm"
              variant="solid"
              className="whitespace-nowrap"
            >
              Cek Tugas
            </Button>
          </Link>
        )
      },
    },
  ]

  return (
    <Card className="flex flex-col flex-1 p-0 mt-4">
      <Title as="h6" weight="semibold" className="px-3 py-2">
        Pengumpulan Tugas Peserta
      </Title>
      <CardSeparator />
      <div className="flex justify-between p-2">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Nama Peserta"
          clearable
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
        />
        <div className="flex items-center space-x-2">
          <Dropdown>
            <Dropdown.Trigger>
              <Button as="span" size="sm" variant="outline">
                Nilai Tertinggi <BsChevronDown className="ml-2 w-5" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item className="justify-between">
                <Text size="sm" className="text-left">
                  Abjad Nama
                </Text>
              </Dropdown.Item>
              <Dropdown.Item className="justify-between">
                <Text size="sm" className="text-left">
                  Nilai Tertinggi
                </Text>{' '}
                <BsCheck size={18} />
              </Dropdown.Item>
              <Dropdown.Item className="justify-between">
                <Text size="sm" className="text-left">
                  Nilai Terendah
                </Text>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Trigger>
              <ActionIconTooltip
                tooltip="Filter"
                as="span"
                size="sm"
                variant="outline"
              >
                <BiFilterAlt size={16} />
              </ActionIconTooltip>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item className="justify-between">
                <Text size="sm" className="text-left">
                  Belum Mengumpulkan
                </Text>
                <BsCheck size={18} />
              </Dropdown.Item>
              <Dropdown.Item className="justify-between">
                <Text size="sm" className="text-left">
                  Sudah Mengumpulkan
                </Text>{' '}
                <BsCheck size={18} />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="relative">
        <Table
          rowKey={(row) => row.id}
          variant="elegant"
          columns={tableColumns}
          data={tableData}
        />
      </div>
      <div className="flex justify-between items-center p-2">
        <Text size="2xs" variant="lighter">
          Menampilkan 10 dari 30 data
        </Text>
        <Pagination total={30} />
      </div>
    </Card>
  )
}
