'use client'

import BerkasCard, {
  BerkasType,
} from '@/components/page/pengajar/ruang-kelas/kelas/berkas/berkas-card'
import { Button, Text } from '@/components/ui'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown, Input } from 'rizzui'
import { IoDocumentText } from 'react-icons/io5'

export default function BerkasPage() {
  const listFile: BerkasType[] = [...Array(12)].map((_) => ({
    name: 'Nama File.ext',
    desc: 'Judul Diskusi',
    image: <IoDocumentText size={26} className="text-green" />,
    size: '5 MB',
    time: '12 Mar 2024 13:00',
  }))

  return (
    <>
      <div className="flex space-x-2 mt-8">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Berkas Bahan Ajar"
          clearable={true}
          className="w-72 sm:w-96"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
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
      <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {listFile.map((file, idx) => (
          <BerkasCard file={file} key={idx} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button>Tampilkan Lebih banyak</Button>
      </div>
    </>
  )
}
