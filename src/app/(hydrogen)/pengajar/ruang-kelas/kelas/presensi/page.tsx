'use client'

import ChartPresensiCard from '@/components/page/pengajar/ruang-kelas/kelas/presensi/chart-card'
import KehadiranPresensiCard from '@/components/page/pengajar/ruang-kelas/kelas/presensi/kehadiran-card'
import RekapPresensiCard from '@/components/page/pengajar/ruang-kelas/kelas/presensi/rekap-card'
import { TableHeaderCell, Text } from '@/components/ui'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'

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
      title: <TableHeaderCell title="Hadir" className="justify-center" />,
      dataIndex: 'hadir',
      key: 'hadir',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark" className="text-center">
          {value}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Izin" className="justify-center" />,
      dataIndex: 'izin',
      key: 'izin',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark" className="text-center">
          {value}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Sakit" className="justify-center" />,
      dataIndex: 'sakit',
      key: 'sakit',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark" className="text-center">
          {value}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Alpha" className="justify-center" />,
      dataIndex: 'alpha',
      key: 'alpha',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark" className="text-center">
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
    {
      id: 5,
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
