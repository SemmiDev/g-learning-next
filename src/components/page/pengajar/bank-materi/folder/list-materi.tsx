'use client'

import { Button, Title } from '@/components/ui'
import { useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Input } from 'rizzui'
import MateriCard, { MateriType } from './materi-card'
import ShareMateriModal from './modal/share-materi'
import TambahMateriModal from './modal/tambah-materi'

export default function ListMateriBody() {
  const [showModalTambahMateri, setShowModalTambahMateri] = useState(false)
  const [showModalShareMateri, setShowModalShareMateri] = useState(false)
  const [shareMateri, setShareMateri] = useState<MateriType | undefined>()

  // data contoh
  const listMateri: MateriType[] = [...Array(12)].map((_, idx) => {
    const type = (idx + 2) % 3 === 0 ? 'tugas' : 'materi'

    return {
      id: idx + 1 + '',
      name: `Judul dari ${type}nya nanti ada disini ya`,
      desc: `Penjelasan singkat terkait ${type} yang dibuat nanti akan muncul disini`,
      time: '12 Mar 2024 13:00',
      fileCount: 4,
      type: type,
    }
  })

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
      <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4">
        {listMateri.map((materi, idx) => (
          <MateriCard
            materi={materi}
            onShare={() => {
              setShareMateri(materi)
              setShowModalShareMateri(true)
            }}
            key={idx}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button>Tampilkan Lebih banyak</Button>
      </div>

      <TambahMateriModal
        showModal={showModalTambahMateri}
        setShowModal={setShowModalTambahMateri}
      />

      <ShareMateriModal
        showModal={showModalShareMateri}
        setShowModal={setShowModalShareMateri}
        materi={shareMateri}
      />
    </>
  )
}
