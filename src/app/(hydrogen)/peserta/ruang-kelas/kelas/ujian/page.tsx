'use client'

import UjianCard from '@/components/page/peserta/ruang-kelas/kelas/ujian/ujian-card'
import { Button, Input, Text } from '@/components/ui'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown } from 'rizzui'

export type UjianItemType = {
  judul: string
  keterangan: string
  batasWaktu: string
  status: 'Belum' | 'Sudah' | 'Ulang'
}

export default function UjianPage() {
  const listUjian: UjianItemType[] = [...Array(11)].map((_, idx) => ({
    judul: 'UAS',
    keterangan: 'Keterangan singkat atau catatan terkait Ujiannya ada disini',
    batasWaktu: '29 februari 2024 | 23:59 WIB',
    status: idx === 0 ? 'Belum' : idx === 1 ? 'Ulang' : 'Sudah',
  }))

  return (
    <div className="flex flex-col gap-x-4 gap-y-6 mt-8 lg:flex-row">
      <div className="flex flex-col w-full lg:w-7/12">
        <div className="flex justify-between gap-x-2 mb-4">
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
        <UjianCard listUjian={listUjian} />
      </div>
    </div>
  )
}
