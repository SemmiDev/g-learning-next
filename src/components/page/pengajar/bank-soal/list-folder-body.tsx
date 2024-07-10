'use client'

import { Button, Title } from '@/components/ui'
import { useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Input } from 'rizzui'
import FolderCard, { FolderType } from './folder-card'
import TambahFolderModal from './modal/tambah-folder'

export default function ListFolderSoalBody() {
  const [showModalTambahFolder, setShowModalTambahFolder] = useState(false)

  const listFolder: FolderType[] = [...Array(12)].map((_) => ({
    name: 'Bank Soal Aljabar Linier',
    count: 15,
  }))

  return (
    <>
      <Title
        as="h4"
        size="1.5xl"
        weight="semibold"
        className="leading-tight mb-3"
      >
        List Bank Soal
      </Title>
      <div className="flex justify-between">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Bank Soal"
          clearable={true}
          className="w-72 sm:w-96"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
        />
        <Button
          size="sm"
          variant="outline-colorful"
          onClick={() => setShowModalTambahFolder(true)}
        >
          Tambah Folder Baru
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listFolder.map((folder, idx) => (
          <FolderCard folder={folder} key={idx} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button>Tampilkan Lebih banyak</Button>
      </div>

      <TambahFolderModal
        showModal={showModalTambahFolder}
        setShowModal={setShowModalTambahFolder}
      />
    </>
  )
}
