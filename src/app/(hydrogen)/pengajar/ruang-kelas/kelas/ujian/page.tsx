'use client'

import KomentarSectionZero from '@/components/page/pengajar/ruang-kelas/kelas/diskusi/komentar-section-zero'
import DropdownNilaiAction from '@/components/page/pengajar/ruang-kelas/kelas/ujian/dropdown-nilai-action'
import {
  Badge,
  Button,
  Card,
  CardSeparator,
  Pagination,
  Table,
  TableHeaderCell,
  Text,
  Title,
} from '@/components/ui'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import { ColumnsType } from 'rc-table'
import { DefaultRecordType } from 'rc-table/lib/interface'
import { BiFilterAlt } from 'react-icons/bi'
import { BsCheck, BsChevronDown, BsPencil, BsTrash } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown, Input } from 'rizzui'

export default function UjianPage() {
  const tableColumns: ColumnsType<DefaultRecordType> = [
    {
      title: <TableHeaderCell title="No" className="justify-center" />,
      dataIndex: 'no',
      key: 'no',
      render: (_: string, __: any, idx: number) => (
        <Text size="sm" weight="medium" variant="dark" className="text-center">
          {idx + 1}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Nama Peserta" />,
      dataIndex: 'nama',
      key: 'nama',
      render: (_: string, row: any) => (
        <div className="flex space-x-3">
          <Image
            src={row.image}
            alt="profile"
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
      render: (_: string, row: any) => (
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
      render: (_: string, row: any) => (
        <div className="flex justify-end">
          <DropdownNilaiAction />
        </div>
      ),
    },
  ]

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

  return (
    <div className="flex flex-wrap gap-4 mt-8 lg:flex-nowrap">
      <div className="w-full lg:w-5/12">
        <div className="flex justify-between">
          <Input
            size="sm"
            type="search"
            placeholder="Cari Sesi Ujian"
            clearable={true}
            prefix={
              <PiMagnifyingGlass size={20} className="text-gray-lighter" />
            }
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
        <Card className="p-0 mt-2">
          {[...Array(10)].map((val, idx) => {
            return (
              <UjianItem
                key={idx}
                active={idx === 1}
                open={idx <= 1}
                idx={idx}
              />
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
        <Card>
          <div className="flex justify-between">
            <div>
              <Text weight="semibold" variant="dark">
                Judul Ujian
              </Text>
              <Text size="sm" weight="medium" variant="lighter">
                Keterangan singkat atau catatan terkait Ujiannya ada disini
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
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 mt-2">
            <div>
              <Text size="sm" weight="medium" variant="lighter">
                Durasi Ujian
              </Text>
              <Text size="sm" weight="medium" variant="dark">
                90 Menit
              </Text>
            </div>
            <div>
              <Text size="sm" weight="medium" variant="lighter">
                Waktu Mulai
              </Text>
              <Text size="sm" weight="medium" variant="dark">
                27 Februari 2024, 00:00 WIB
              </Text>
            </div>
            <div>
              <Text size="sm" weight="medium" variant="lighter">
                Waktu Selesai
              </Text>
              <Text size="sm" weight="medium" variant="dark">
                29 Februari 2024, 00:00 WIB
              </Text>
            </div>
          </div>
        </Card>
        <Card className="flex flex-col flex-1 p-0 mt-4">
          <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
            Peserta yang Mengikuti Ujian
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
                  <Button size="sm" variant="outline">
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
                  <Button size="sm" variant="outline">
                    <BiFilterAlt size={16} />
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Menu>
                  <Dropdown.Item className="justify-between">
                    <Text size="sm" className="text-left">
                      Belum Ujian
                    </Text>
                    <BsCheck size={18} />
                  </Dropdown.Item>
                  <Dropdown.Item className="justify-between">
                    <Text size="sm" className="text-left">
                      Sudah Ujian
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
  )
}

function UjianItem({
  active = false,
  open = false,
  idx = 0,
}: {
  active?: boolean
  open?: boolean
  idx?: number
}) {
  const titles = [
    'UAS',
    'QUIZ 4',
    'QUIZ 3',
    'QUIZ 2',
    'UTS',
    'Judul Ujian Pertama',
    'Judul Seterusnya',
  ]

  return (
    <div
      className={cn(
        'cursor-pointer px-3 py-2 hover:bg-gray-50',
        active
          ? 'border-t-[3px] border-t-primary'
          : 'border-t border-t-gray-100'
      )}
    >
      <div className="flex justify-between">
        <Text
          weight="semibold"
          color={active ? 'primary' : 'gray'}
          variant={active ? 'default' : 'dark'}
        >
          {titles[idx] ?? 'Judul Ujian'}
        </Text>
        <Badge size="sm" color={open ? 'success' : 'danger'} variant="flat">
          {open ? 'Open' : 'Closed'}
        </Badge>
      </div>
      <Text size="sm" variant="lighter">
        Keterangan singkat terkait ujiannya
      </Text>
      <Text size="sm" weight="semibold" variant="lighter" className="mt-2">
        Batas waktu pengerjaan
      </Text>
      <Text size="sm" weight="semibold" variant="dark">
        29 februari 2024, 23:59 WIB
      </Text>
    </div>
  )
}
