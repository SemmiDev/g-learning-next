'use client'

import AbsensiCard from '@/components/page/peserta/ruang-kelas/kelas/presensi/absensi-card'
import ChartPresensiCard from '@/components/page/peserta/ruang-kelas/kelas/presensi/chart-card'
import { Input, Text } from '@/components/ui'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Button, Dropdown } from 'rizzui'

const COLORS = ['#33C50E', '#F6B63B', '#3B82F6', '#F63B3B']

export type AbsenItemType = {
  judul: string
  waktu: string
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha'
}

export default function PresensiPage() {
  const chartData = [
    { name: 'Hadir', value: 60 },
    { name: 'Izin', value: 25 },
    { name: 'Sakit', value: 10 },
    { name: 'Alpha', value: 5 },
  ]

  const listAbsen: AbsenItemType[] = [...Array(15)].map((_, idx) => ({
    judul: 'Judul sesi absensi',
    waktu: 'Kamis, 29 februari 2024 | 23:59 WIB',
    status: [1, 11].includes(idx)
      ? 'Izin'
      : idx === 2
      ? 'Sakit'
      : idx === 3
      ? 'Alpha'
      : 'Hadir',
  }))

  return (
    <div className="flex flex-col gap-x-4 gap-y-6 mt-8 lg:flex-row">
      <div className="flex flex-col w-full lg:w-7/12">
        <div className="flex justify-between space-x-2 mb-4">
          <Input
            size="sm"
            type="search"
            placeholder="Cari sesi belajar"
            clearable={true}
            className="w-72 sm:w-96"
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
        <AbsensiCard listAbsen={listAbsen} />
      </div>
      <div className="flex flex-col flex-1">
        <ChartPresensiCard data={chartData} colors={COLORS} />
      </div>
    </div>
  )
}
