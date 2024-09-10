import {
  Button,
  Card,
  CardSeparator,
  Pagination,
  Table,
  TableHeaderCell,
  Text,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import Link from 'next/link'
import { ColumnsType } from 'rc-table'
import { BiFilterAlt } from 'react-icons/bi'
import { BsCheck, BsChevronDown, BsPencil, BsTrash } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown, Input } from 'rizzui'
import KomentarSectionZero from '../diskusi/komentar-section-zero'
import DropdownNilaiAction from './dropdown-nilai-action'
import RekapTugasItem from './rekap-item'

export default function RekapTugasCard() {
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
          <Image
            src={row.image}
            alt="profil"
            className="w-10 h-10 rounded-md"
          />
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
              <DropdownNilaiAction />
            </div>
          )
        }

        return (
          <Link href={`${routes.pengajar.kelas}/tugas/detail`}>
            <Button size="sm" variant="solid" className="whitespace-nowrap">
              Cek Tugas
            </Button>
          </Link>
        )
      },
    },
  ]

  return (
    <Card className="col-span-3">
      <Title as="h4" size="1.5xl" weight="semibold">
        Rekap Presensi Peserta
      </Title>
      <div className="flex flex-wrap gap-4 mt-4 lg:flex-nowrap">
        <div className="w-full lg:w-5/12">
          <div className="flex justify-between">
            <Input
              size="sm"
              type="search"
              placeholder="Cari Tugas"
              clearable={true}
              prefix={
                <PiMagnifyingGlass size={20} className="text-gray-lighter" />
              }
            />
            <Dropdown>
              <Dropdown.Trigger>
                <Button as="span" size="sm" variant="outline">
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
          <Card className="p-0 mt-2">
            {[...Array(10)].map((val, idx) => {
              return (
                <RekapTugasItem key={idx} active={idx === 1} open={idx <= 1} />
              )
            })}
          </Card>
          <div className="flex justify-between items-center p-2">
            <Text size="2xs" variant="lighter">
              Menampilkan 10 dari 30 data
            </Text>
            <Pagination total={30} />
          </div>
        </div>
        <div className="w-full lg:w-7/12">
          <Card className="flex justify-between">
            <div>
              <Text weight="semibold" variant="dark">
                Judul Tugas
              </Text>
              <Text size="sm" weight="medium" variant="lighter">
                Keterangan singkat terkait tugasnya
              </Text>
              <Text
                size="sm"
                weight="medium"
                variant="lighter"
                className="mt-2"
              >
                Batas waktu pengumpulan
              </Text>
              <Text size="sm" weight="medium" variant="dark">
                Kamis, 29 februari 2024, 23:59 WIB
              </Text>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-wrap justify-end">
                <Button size="sm" color="warning" variant="text">
                  <BsPencil className="mr-2" /> Ubah
                </Button>
                <Button size="sm" color="danger" variant="text">
                  <BsTrash className="mr-2" /> Hapus
                </Button>
              </div>
              <Text size="sm" weight="medium" variant="lighter">
                30 peserta mengumpulkan Tugas
              </Text>
            </div>
          </Card>
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
                clearable={true}
                prefix={
                  <PiMagnifyingGlass size={20} className="text-gray-lighter" />
                }
              />
              <div className="flex space-x-2">
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
                    <Button as="span" size="sm" variant="outline">
                      <BiFilterAlt size={16} />
                    </Button>
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
          <Card className="mt-4">
            <KomentarSectionZero />
          </Card>
        </div>
      </div>
    </Card>
  )
}
