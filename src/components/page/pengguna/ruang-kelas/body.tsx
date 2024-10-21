'use client'

import { Button, Text, Title } from '@/components/ui'
import { useState } from 'react'
import ListKelasCardList from './card-list'
import BuatKelasModal from './modal/buat-kelas'

export default function ListKelasBody() {
  const [showModalBuatKelas, setShowModalBuatKelas] = useState(false)

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
        <Button size="sm" onClick={() => setShowModalBuatKelas(true)}>
          Buat Kelas
        </Button>
      </div>

      <ListKelasCardList />

      <BuatKelasModal
        showModal={showModalBuatKelas}
        setShowModal={setShowModalBuatKelas}
      />
    </>
  )
}
