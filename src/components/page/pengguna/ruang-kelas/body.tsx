'use client'

import { Button, Text, Title } from '@/components/ui'
import { useState } from 'react'
import ListKelasCardList from './card-list'
import BuatKelasModal from './modal/buat-kelas'
import GabungKelasModal from './modal/gabung-kelas'

export default function ListKelasBody() {
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
            Semua Kelas yang Dikelola
          </Title>
          <Text size="sm" weight="semibold" variant="lighter">
            Semua kelas yang Kamu buat dan bisa dikelola
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

      <ListKelasCardList />

      <GabungKelasModal
        showModal={showGabungKelas}
        setShowModal={setShowGabungKelas}
      />

      <BuatKelasModal
        showModal={showBuatKelas}
        setShowModal={setShowBuatKelas}
      />
    </>
  )
}
