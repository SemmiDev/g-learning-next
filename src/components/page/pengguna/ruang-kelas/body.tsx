'use client'

import { Button, Text, Title } from '@/components/ui'
import { useState } from 'react'
import ListKelasCardList from './card-list'
import BuatKelasModal from './modal/buat-kelas'
import GabungKelasModal from './modal/gabung-kelas'

type ListKelasBodyProps = {
  kategori?: 'Dikelola' | 'Diikuti'
}

export default function ListKelasBody({ kategori }: ListKelasBodyProps) {
  const [showBuatKelas, setShowBuatKelas] = useState(false)
  const [showGabungKelas, setShowGabungKelas] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <Title
            as="h4"
            size="1.5xl"
            weight="semibold"
            className="leading-tight mb-3"
          >
            Semua Kelas yang {kategori}
          </Title>
          <Text size="sm" weight="semibold" variant="lighter">
            {kategori === 'Dikelola'
              ? 'Semua kelas yang Kamu buat dan bisa dikelola'
              : 'Semua daftar kelas yang Kamu ikuti'}
          </Text>
        </div>
        <div className="flex justify-end flex-wrap gap-2">
          <Button
            size="sm"
            color="info"
            onClick={() => setShowGabungKelas(true)}
          >
            Gabung Kelas
          </Button>
          <Button size="sm" onClick={() => setShowBuatKelas(true)}>
            Buat Kelas
          </Button>
        </div>
      </div>

      <ListKelasCardList kategori={kategori} />

      <GabungKelasModal show={showGabungKelas} setShow={setShowGabungKelas} />

      <BuatKelasModal
        showModal={showBuatKelas}
        setShowModal={setShowBuatKelas}
      />
    </>
  )
}
