'use client'

import { Button, Title } from '@/components/ui'
import { useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Input } from 'rizzui'
import TambahBankSoalModal from './modal/tambah-bank-soal'
import SoalCard, { SoalType } from './soal-card'

export default function ListSoalBody() {
  const [showTambah, setShowTambah] = useState(false)

  const listSoal: SoalType[] = [...Array(12)].map((_) => ({
    title: 'Soal UTS',
    desc: 'Penjelasan singkat terkait soal yang dibuat',
    time: '12 Mar 2024 13:00',
    count: 100,
  }))

  return (
    <>
      <Title
        as="h4"
        size="1.5xl"
        weight="semibold"
        className="leading-tight mb-3"
      >
        Bank Soal Aljabar Linier
      </Title>
      <div className="flex justify-between">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Bank Soal"
          clearable
          className="w-72 sm:w-96"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
        />
        <Button
          size="sm"
          variant="outline-colorful"
          onClick={() => setShowTambah(true)}
        >
          Tambah Soal
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4">
        {listSoal.map((soal, idx) => (
          <SoalCard soal={soal} key={idx} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button>Tampilkan Lebih banyak</Button>
      </div>

      <TambahBankSoalModal show={showTambah} setShow={setShowTambah} />
    </>
  )
}
