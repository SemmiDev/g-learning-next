'use client'

import { Button, Title } from '@/components/ui'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Input } from 'rizzui'
import { useState } from 'react'
import MateriCard, { MateriType } from './materi-card'
import TambahMateriModal from './modal/tambah-materi'

export default function ListMateriBody() {
  const [showModalTambahMateri, setShowModalTambahMateri] = useState(false)

  const listMateri: MateriType[] = [...Array(12)].map((_) => ({
    title: 'Judul dari materinya nanti ada disini ya maksimal 2 baris aja',
    desc: 'Penjelasan singkat terkait materi yang dibuat nanti akan muncul disini',
    time: '12 Mar 2024 13:00',
    fileCount: 4,
  }))

  return (
    <>
      <Title
        as="h5"
        weight="semibold"
        className="text-[1.375rem] leading-tight mb-4"
      >
        Bank Materi Aljabar Linier
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
          onClick={() => setShowModalTambahMateri(true)}
        >
          Tambah Materi
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listMateri.map((materi, idx) => (
          <MateriCard materi={materi} key={idx} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button>Tampilkan Lebih banyak</Button>
      </div>

      <TambahMateriModal
        showModal={showModalTambahMateri}
        setShowModal={setShowModalTambahMateri}
      />
    </>
  )
}
