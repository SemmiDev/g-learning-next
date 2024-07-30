'use client'

import {
  Button,
  Card,
  CardSeparator,
  Table,
  TableHeaderCell,
  Text,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import imageKelas from '@public/images/list-kelas.png'
import Image from 'next/image'
import Link from 'next/link'
import Calendar from 'react-calendar'
import { LuFileText, LuFolder, LuHome, LuUsers } from 'react-icons/lu'
import DashboardCountCard from './count-card'
import DashboardRecentFileCard from './recent-file-card'
import DashboardRuangPenyimpananCard from './ruang-penyimpanan-card'

export default function DashboardBody() {
  const tableJadwalColumns = [
    {
      title: <TableHeaderCell title="Nama Kelas" />,
      dataIndex: 'kelas',
      key: 'kelas',
      render: (value: string, row: any) => (
        <div className="flex items-center space-x-2">
          <Image
            src={row.image}
            alt="profile"
            className="w-10 h-10 rounded-md object-cover"
          />
          <Text size="sm" weight="semibold" variant="dark">
            {value}
          </Text>
        </div>
      ),
    },
    {
      title: <TableHeaderCell title="Hari dan Tanggal" />,
      dataIndex: 'tanggal',
      key: 'tanggal',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark">
          {value}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Jam" />,
      dataIndex: 'jam',
      key: 'jam',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark">
          {value}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Instansi" />,
      dataIndex: 'instansi',
      key: 'instansi',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark">
          {value}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      render: (_: string, row: any) => {
        return (
          <Link
            href={`${routes.pengajar.kelas}`}
            className="flex justify-center"
          >
            <Button variant="text-colorful">Masuk Kelas</Button>
          </Link>
        )
      },
    },
  ]

  const tableJadwalData = [
    {
      id: 1,
      kelas: 'Sistem Informasi',
      tanggal: 'Kamis, 22 Desember 2023',
      jam: '15:00-17:00 WIB',
      instansi: 'UIN SUSKA Riau',
      image: imageKelas,
    },
    {
      id: 2,
      kelas: 'Biology tingkat lanjut',
      tanggal: 'Kamis, 22 Desember 2023',
      jam: '15:00-17:00 WIB',
      instansi: 'UIN SUSKA Riau',
      image: imageKelas,
    },
    {
      id: 3,
      kelas: 'Aljabar Linear',
      tanggal: 'Kamis, 22 Desember 2023',
      jam: '15:00-17:00 WIB',
      instansi: 'UIN SUSKA Riau',
      image: imageKelas,
    },
    {
      id: 4,
      kelas: 'Jaringan dan Keamanan Data',
      tanggal: 'Kamis, 22 Desember 2023',
      jam: '15:00-17:00 WIB',
      instansi: 'UIN SUSKA Riau',
      image: imageKelas,
    },
    {
      id: 5,
      kelas: 'Human Computer Interaction',
      tanggal: 'Kamis, 22 Desember 2023',
      jam: '15:00-17:00 WIB',
      instansi: 'UIN SUSKA Riau',
      image: imageKelas,
    },
  ]

  const tableKursusColumns = [
    {
      title: <TableHeaderCell title="Nama Kursus" />,
      dataIndex: 'nama',
      key: 'nama',
      render: (value: string, row: any) => (
        <div className="flex items-center space-x-2">
          <Image
            src={row.image}
            alt="profile"
            className="w-10 h-10 rounded-md object-cover"
          />
          <Text size="sm" weight="semibold" variant="dark">
            {value}
          </Text>
        </div>
      ),
    },
    {
      title: <TableHeaderCell title="Total Modul" />,
      dataIndex: 'modul',
      key: 'modul',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark">
          {value} Modul
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Progress" />,
      dataIndex: 'progress',
      key: 'progress',
      render: (value: string, row: any) => (
        <Text size="sm" weight="medium" variant="dark">
          {value}/{row.progress} Modul
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Creator" />,
      dataIndex: 'creator',
      key: 'creator',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark">
          {value}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      render: (_: string, row: any) => {
        return (
          <div className="flex justify-center">
            <Button variant="text-colorful">Mulai Belajar</Button>
          </div>
        )
      },
    },
  ]

  const tableKursusData = [
    {
      id: 1,
      nama: 'Sistem Informasi',
      modul: 75,
      progress: 12,
      creator: 'Garuda Cyber Institute',
      image: imageKelas,
    },
    {
      id: 2,
      nama: 'Biologi Tinggat Lanjut',
      modul: 15,
      progress: 0,
      creator: 'Visual Vulcream',
      image: imageKelas,
    },
    {
      id: 3,
      nama: 'Aljabar Linear',
      modul: 5,
      progress: 5,
      creator: 'Garuda Cyber Institute',
      image: imageKelas,
    },
    {
      id: 4,
      nama: 'Jaringan dan Keamanan Data',
      modul: 35,
      progress: 35,
      creator: 'Randa Nurhidayat',
      image: imageKelas,
    },
    {
      id: 5,
      nama: 'Human Computer Interaction',
      modul: 12,
      progress: 12,
      creator: 'Kelas Juwara',
      image: imageKelas,
    },
  ]

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <DashboardCountCard label="Jumlah Kelas" count="34" Icon={LuHome} />
        <DashboardCountCard
          label="Jumlah Anggota Kelas"
          count="34"
          Icon={LuUsers}
        />
        <DashboardCountCard
          label="Jumlah Bank Materi"
          count="34"
          Icon={LuFileText}
        />
        <DashboardCountCard
          label="Jumlah Bank Soal"
          count="100"
          Icon={LuFolder}
        />
      </div>

      <div className="flex flex-wrap items-baseline gap-4">
        <Card className="flex flex-col w-full p-0 lg:w-7/12">
          <Title as="h4" weight="semibold" className="p-2">
            Jadwal Kelas Akan Datang
          </Title>
          <CardSeparator />
          <Table
            rowKey={(record) => record.id}
            variant="elegant"
            columns={tableJadwalColumns}
            data={tableJadwalData}
          />
        </Card>

        <Card className="flex flex-col flex-1 p-0">
          <Title as="h4" weight="semibold" className="p-2">
            Kalender
          </Title>
          <CardSeparator />
          <div className="py-2 px-6">
            <Calendar
              prev2Label={false}
              next2Label={false}
              className="!w-full !border-0 !bg-transparent !font-inter !text-base"
            />
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4">
        <DashboardRuangPenyimpananCard />
        <DashboardRecentFileCard />
      </div>

      <Card className="flex flex-col w-full p-0">
        <Title as="h4" weight="semibold" className="p-2">
          Kursus yang Anda Ikuti
        </Title>
        <CardSeparator />
        <Table
          rowKey={(record) => record.id}
          variant="elegant"
          columns={tableKursusColumns}
          data={tableKursusData}
        />
      </Card>
    </div>
  )
}
