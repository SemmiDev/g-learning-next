'use client'

import TugasCard from '@/components/page/peserta/ruang-kelas/kelas/tugas/tugas-card'
import { Button, Input, Text } from '@/components/ui'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown } from 'rizzui'

export type TugasItemType = {
  judul: string
  keterangan: string
  batasWaktu: string
  status: 'Belum' | 'Sudah' | 'Tidak'
}

export default function TugasPage() {
  const listTugas: TugasItemType[] = [...Array(11)].map((_, idx) => ({
    judul: 'Judul Tugas',
    keterangan: 'Keterangan singkat terkait tugasnya',
    batasWaktu: '29 februari 2024 | 23:59 WIB',
    status: idx === 0 ? 'Belum' : [8, 10].includes(idx) ? 'Tidak' : 'Sudah',
  }))

  return (
    <div className="flex flex-col gap-x-4 gap-y-6 mt-8 lg:flex-row">
      <div className="flex flex-col w-full lg:w-7/12">
        <div className="flex justify-between space-x-2 mb-4">
          <Input
            size="sm"
            type="search"
            placeholder="Cari sesi belajar"
            clearable
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
        <TugasCard listTugas={listTugas} />
      </div>
    </div>
  )
}
