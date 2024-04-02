'use client'

import Card from '@/components/ui/card'
import { Text, Title } from 'rizzui'
import Table, { HeaderCell } from '@/components/ui/table'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import Pagination from '@/components/ui/pagination'
import ChartPresensiCard from '@/components/page/pengajar/ruang-kelas/kelas/presensi/chart-card'
import KehadiranPresensiCard from '@/components/page/pengajar/ruang-kelas/kelas/presensi/kehadiran-card'
import RekapPresensiCard from '@/components/page/pengajar/ruang-kelas/kelas/presensi/rekap-card'

const COLORS = ['#FFD1D1', '#D68585', '#B92E5D', '#6D1A36']

export default function PresensiPage() {
  const chartData = [
    { name: 'Hadir', value: 60 },
    { name: 'Izin', value: 25 },
    { name: 'Sakit', value: 10 },
    { name: 'Alpha', value: 5 },
  ]

  const tableColumns = [
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
            <Text className="text-sm text-gray-dark font-semibold">
              {row.nama}
            </Text>
            <Text className="text-2xs text-gray-lighter font-medium mt-0.5">
              {row.email}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Hadir" className="justify-center" />,
      dataIndex: 'hadir',
      key: 'hadir',
      render: (value: string) => (
        <Text className="text-sm font-medium text-gray-dark text-center">
          {value}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="Izin" className="justify-center" />,
      dataIndex: 'izin',
      key: 'izin',
      render: (value: string) => (
        <Text className="text-sm font-medium text-gray-dark text-center">
          {value}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="Sakit" className="justify-center" />,
      dataIndex: 'sakit',
      key: 'sakit',
      render: (value: string) => (
        <Text className="text-sm font-medium text-gray-dark text-center">
          {value}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="Alpha" className="justify-center" />,
      dataIndex: 'alpha',
      key: 'alpha',
      render: (value: string) => (
        <Text className="text-sm font-medium text-gray-dark text-center">
          {value}
        </Text>
      ),
    },
  ]

  const tableData = [
    {
      id: 1,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      hadir: 12,
      izin: 4,
      sakit: 1,
      alpha: 1,
    },
    {
      id: 2,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      hadir: 12,
      izin: 4,
      sakit: 1,
      alpha: 1,
    },
    {
      id: 3,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      hadir: 12,
      izin: 4,
      sakit: 1,
      alpha: 1,
    },
    {
      id: 4,
      nama: 'Annitsa Bestweden',
      email: 'email@namaweb.com',
      image: imagePhoto,
      hadir: 12,
      izin: 4,
      sakit: 1,
      alpha: 1,
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-6 mt-8">
      <ChartPresensiCard
        className="col-span-3 lg:col-span-1"
        data={chartData}
        colors={COLORS}
      />
      <KehadiranPresensiCard columns={tableColumns} data={tableData} />
      <RekapPresensiCard />
    </div>
  )
}
