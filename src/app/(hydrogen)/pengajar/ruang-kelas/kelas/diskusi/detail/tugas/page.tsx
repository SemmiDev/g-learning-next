'use client'

import KomentarSectionShort from '@/components/page/pengajar/ruang-kelas/kelas/diskusi/komentar-section-short'
import DropdownNilaiAction from '@/components/page/pengajar/ruang-kelas/kelas/tugas/dropdown-nilai-action'
import {
  Button,
  Card,
  CardSeparator,
  Pagination,
  ReadMore,
  Table,
  TableHeaderCell,
  Text,
  TextSpan,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import Link from 'next/link'
import { ColumnsType } from 'rc-table'
import { BiFilterAlt } from 'react-icons/bi'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { RiArrowLeftLine } from 'react-icons/ri'
import { Dropdown, Input } from 'rizzui'

export default function DiskusiDetailTugasPage() {
  const tableData = [
    {
      id: 1,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      tanggal: '15 Des 24',
      jam: '15 : 36',
      nilai: 92,
    },
    {
      id: 2,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      tanggal: '15 Des 24',
      jam: '15 : 36',
      nilai: 89,
    },
    {
      id: 3,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      tanggal: '15 Des 24',
      jam: '15 : 36',
      nilai: 86,
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
      nilai: null,
    },
  ]

  const tableColumns: ColumnsType<(typeof tableData)[number]> = [
    {
      title: <TableHeaderCell title="No" className="justify-center" />,
      dataIndex: 'no',
      render: (_: string, __: any, idx: number) => (
        <Text size="sm" weight="medium" variant="dark" className="text-center">
          {idx + 1}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Nama Peserta" />,
      dataIndex: 'nama',
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
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark" className="text-center">
          {value ?? '-'}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="" />,
      dataIndex: 'nilai',
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
    <>
      <div className="mt-4 mb-4">
        <Link href={routes.pengajar.kelas}>
          <Button variant="text" color="primary" className="text-gray-dark">
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap items-start space-y-8 lg:space-x-4 lg:space-y-0">
        <Card className="flex flex-col p-0 w-full lg:w-6/12">
          <div className="flex justify-between items-start px-4 py-2">
            <div className="flex flex-col">
              <Text size="lg" weight="semibold" variant="dark" className="mb-2">
                Judul Tugas
              </Text>
              <Text size="sm">
                <ReadMore>
                  Ini merupakan catatan dari sebuah tugas yang telah dibuat,
                  cukup di buat dalam 2 kalimat dan tambahkan. Ini merupakan
                  catatan dari sebuah diskusi yang telah dibuat, cukup di buat
                  dalam 2 kalimat dan tambahkan.
                </ReadMore>
              </Text>
              <Text size="sm" weight="semibold" variant="dark" className="mt-2">
                Batas Waktu Pengumpulan:{' '}
                <TextSpan color="danger">13 April 2024, 23:59 WIB </TextSpan>
              </Text>
            </div>
          </div>
          <CardSeparator />
          <KomentarSectionShort className="p-4" />
        </Card>
        <Card className="flex flex-col flex-1 p-0">
          <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
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
      </div>
    </>
  )
}
