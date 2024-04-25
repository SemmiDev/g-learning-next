'use client'

import { Button, Title } from '@/components/ui'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Input } from 'rizzui'
import FolderCard, { FolderType } from './folder-card'
import { useState } from 'react'
import TambahFolderModal from './modal/tambah-folder'

export default function ListFolderMateriBody() {
  const [showModalTambahFolder, setShowModalTambahFolder] = useState(false)

  const listFolder: FolderType[] = [...Array(12)].map((_) => ({
    name: 'Bank Materi Aljabar Linier',
    count: 15,
  }))

  return (
    <>
      <Title
        as="h5"
        weight="semibold"
        className="text-[1.375rem] leading-tight mb-4"
      >
        List Bank Materi
      </Title>
      <div className="flex justify-between">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Bank Materi"
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
      <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
