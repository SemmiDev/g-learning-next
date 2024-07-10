'use client'

import { Button, Text, Title } from '@/components/ui'
import { useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown, Input } from 'rizzui'
import FileCard, { FileType } from './file-card'
import DriveButton from './drive-button'
import { BsCheck, BsChevronDown } from 'react-icons/bs'

export default function HomePustakaMediaBody() {
  const [activeDrive, setActiveDrive] = useState<number | null>(null)
  const [activeFolder, setActiveFolder] = useState<FileType | null>(null)
  const [showModalTambahFolder, setShowModalTambahFolder] = useState(false)

  const drives = [
    { name: 'Penyimpanan Personal', used: 307200, size: 1048576 },
    { name: 'Penyimpanan Akademik', used: 11534336, size: 20971520 },
  ]

  const listFolder: FileType[] = [
    {
      id: 'fo1',
      name: 'Aljabar Linier',
      type: 'folder',
      fileCount: 15,
      time: '12 Desember 2024',
    },
    {
      id: 'fo2',
      name: 'Sistem Informasi',
      type: 'folder',
      fileCount: 15,
      time: '12 Desember 2024',
    },
    {
      id: 'fo3',
      name: 'Algoritma Pemrograman',
      type: 'folder',
      fileCount: 15,
      time: '12 Desember 2024',
    },
    {
      id: 'fo4',
      name: 'Bahasa Arab',
      type: 'folder',
      fileCount: 15,
      time: '12 Desember 2024',
    },
    {
      id: 'fi1',
      name: 'Video Aljabar Linier',
      type: 'file',
      icon: 'video',
      size: 60000,
      time: '12 Desember 2024',
    },
    {
      id: 'fi2',
      name: 'Alur Sistem Informasi.pdf',
      type: 'file',
      icon: 'file',
      size: 100,
      time: '12 Desember 2024',
    },
    {
      id: 'fi3',
      name: 'Kontrak belajar Kelas TI A.docx',
      type: 'file',
      icon: 'file',
      size: 250,
      time: '12 Desember 2024',
    },
    {
      id: 'fi4',
      name: 'Bahasa Ibrani.pptx',
      type: 'file',
      icon: 'file',
      size: 120,
      time: '12 Desember 2024',
    },
    {
      id: 'fi1',
      name: 'Grafik Menulis.png',
      type: 'file',
      icon: 'file',
      size: 500,
      time: '12 Desember 2024',
    },
  ]

  return (
    <>
      <div className="flex flex-wrap gap-4 mb-6">
        {drives.map((drive, idx) => (
          <DriveButton
            drive={drive}
            active={activeDrive === idx}
            onClick={() => {
              setActiveDrive(idx)
              setActiveFolder(null)
            }}
            key={idx}
          />
        ))}
      </div>
      <Title
        as="h4"
        size="1.5xl"
        weight="semibold"
        className="leading-tight mb-3"
      >
        Pustaka Media
      </Title>
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <Input
            size="sm"
            type="search"
            placeholder="Cari Berkas"
            clearable={true}
            className="w-72 sm:w-96"
            prefix={
              <PiMagnifyingGlass size={20} className="text-gray-lighter" />
            }
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
        {activeDrive != null && (
          <Button
            size="sm"
            variant="outline-colorful"
            onClick={() => setShowModalTambahFolder(true)}
          >
            Tambah Folder Baru
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listFolder.map((file, idx) => (
          <FileCard file={file} key={idx} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button>Tampilkan Lebih banyak</Button>
      </div>
    </>
  )
}
