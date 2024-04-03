'use client'

import { routes } from '@/config/routes'
import Link from 'next/link'
import { ActionIcon, Checkbox, Dropdown, Input, Textarea } from 'rizzui'
import { RiArrowLeftLine } from 'react-icons/ri'
import {
  BsChatSquareText,
  BsCheck,
  BsChevronDown,
  BsFileText,
  BsFillSendFill,
} from 'react-icons/bs'
import Image from 'next/image'
import Card from '@/components/ui/card'
import imagePhoto from '@public/images/photo.png'
import CardSeparator from '@/components/ui/card-separator'
import { FaChevronDown } from 'react-icons/fa'
import { Button, ReadMore, Text, TextSpan, Title } from '@/components/ui'
import Table, { HeaderCell } from '@/components/ui/table'
import DropdownNilaiAction from '@/components/page/pengajar/ruang-kelas/kelas/diskusi/tugas/dropdown-nilai-action'
import { PiMagnifyingGlass } from 'react-icons/pi'

export default function DiskusiDetailTugasPage() {
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
      title: <HeaderCell title="Waktu Pengumpulan" />,
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
      render: (_: string, row: any) => {
        if (row.nilai != null) {
          return (
            <div className="flex justify-end">
              <DropdownNilaiAction />
            </div>
          )
        }

        return (
          <Button size="sm" variant="solid" className="whitespace-nowrap">
            Cek Tugas
          </Button>
        )
      },
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
          <div className="flex flex-col p-4">
            <div className="flex items-center space-x-2">
              <Image
                src={imagePhoto}
                alt="profile"
                className="w-8 h-8 rounded-md"
              />
              <Textarea
                className="flex-1"
                rows={2}
                placeholder="Tulis Komentar..."
              ></Textarea>
              <ActionIcon size="sm" variant="outline">
                <BsFillSendFill size={12} />
              </ActionIcon>
            </div>
            <div className="flex mt-2">
              <Button
                size="sm"
                variant="text"
                className="flex space-x-1 items-center text-gray-dark p-0 hover:text-primary"
              >
                <BsChatSquareText size={14} />
                <Text size="2xs" weight="semibold">
                  6 Komentar
                </Text>
              </Button>
            </div>
            <div className="ps-4 mt-2">
              <div className="flex space-x-2">
                <Image
                  src={imagePhoto}
                  alt="profile"
                  className="w-8 h-8 rounded-md"
                />
                <div className="flex flex-col items-start text-gray-dark">
                  <Text weight="semibold">Anjal Karman</Text>
                  <Text size="sm" className="leading-5">
                    ini adalah komentar dari user yang membuat komentar ini
                    adalah komentar dari user yang membuat komentar ini adalah
                    komentar dari user yang membuat komentar ini adalah komentar
                    dari user yang membuat komentar
                  </Text>
                  <div className="flex space-x-2">
                    <Text size="sm">4 hari</Text>
                    <Button
                      size="sm"
                      variant="text"
                      className="text-sm font-bold h-auto p-0"
                    >
                      Balas
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="text"
                    className="text-sm font-bold h-auto p-0"
                  >
                    <FaChevronDown className="me-1" /> 3 balasan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card className="flex flex-col flex-1 p-0">
          <Title as="h6" weight="semibold" className="px-3 py-2">
            Pengumpulan Tugas Peserta
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
            <Dropdown>
              <Dropdown.Trigger>
                <Button size="sm" variant="outline">
                  Belum Mengumpulkan <BsChevronDown className="ml-2 w-5" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item className="justify-between">
                  <Text size="sm" className="text-left">
                    Belum Mengumpulkan
                  </Text>{' '}
                  <BsCheck size={18} />
                </Dropdown.Item>
                <Dropdown.Item className="justify-between">
                  <Text size="sm" className="text-left">
                    Sudah Mengumpulkan
                  </Text>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
