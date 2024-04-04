'use client'

import { routes } from '@/config/routes'
import Link from 'next/link'
import { Dropdown, Input } from 'rizzui'
import { RiArrowLeftLine } from 'react-icons/ri'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import Image from 'next/image'
import Card from '@/components/ui/card'
import imagePhoto from '@public/images/photo.png'
import CardSeparator from '@/components/ui/card-separator'
import { Button, ReadMore, Text, TextSpan, Title } from '@/components/ui'
import Table, { HeaderCell } from '@/components/ui/table'
import DropdownNilaiAction from '@/components/page/pengajar/ruang-kelas/kelas/diskusi/tugas/dropdown-nilai-action'
import { PiMagnifyingGlass } from 'react-icons/pi'
import KomentarSectionShort from '@/components/page/pengajar/ruang-kelas/kelas/diskusi/komentar-section-short'

export default function DiskusiDetailUjianPage() {
  const tableColumns = [
    {
      title: <HeaderCell title="No" className="justify-center" />,
      dataIndex: 'no',
      key: 'no',
      render: (_: string, __: any, idx: number) => (
        <Text size="sm" weight="medium" variant="dark" className="text-center">
          {idx + 1}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="Nama Peserta" />,
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
      title: <HeaderCell title="Tanggal & Waktu Pengerjaan" />,
      dataIndex: 'tanggal',
      key: 'tanggal',
      render: (value: string, row: any) => (
        <Text size="sm" weight="medium" variant="dark">
          {row.tanggal}
          <br />
          {row.jam}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="Nilai" className="justify-center" />,
      dataIndex: 'nilai',
      key: 'nilai',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark" className="text-center">
          {value ?? '-'}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="" />,
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
      nilai: 91,
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
      nilai: 85,
    },
    {
      id: 5,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      tanggal: '15 Des 24',
      jam: '15 : 36',
      nilai: 85,
    },
  ]

  return (
    <>
      <div className="mt-4 mb-4">
        <Link href={routes.kelas}>
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
                Judul Ujian
              </Text>
              <Text size="sm">
                <ReadMore>
                  Ini merupakan catatan dari sebuah tugas yang telah dibuat,
                  cukup di buat dalam 2 kalimat dan tambahkan. Ini merupakan
                  catatan dari sebuah diskusi yang telah dibuat, cukup di buat
                  dalam 2 kalimat dan tambahkan.
                </ReadMore>
              </Text>
            </div>
          </div>
          <CardSeparator />
          <KomentarSectionShort className="p-4" />
        </Card>
        <Card className="flex flex-col flex-1 p-0">
          <Title as="h6" weight="semibold" className="px-3 py-2">
            Peserta yang Mengikuti Ujian
          </Title>
          <CardSeparator />
          <div className="flex justify-between p-2">
            <Input
              size="sm"
              type="search"
              prefix={
                <PiMagnifyingGlass size={20} className="text-gray-lighter" />
              }
              placeholder="Cari Nama Peserta"
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
                    Sudah Ujian <BsChevronDown className="ml-2 w-5" />
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Menu>
                  <Dropdown.Item className="justify-between">
                    <Text size="sm" className="text-left">
                      Belum Ujian
                    </Text>
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
              rowKey={(record) => record.id}
              variant="elegant"
              columns={tableColumns}
              data={tableData}
            />
          </div>
        </Card>
      </div>
    </>
  )
}
