'use client'

import { Button, Text, Title } from '@/components/ui'
import CardKelas from './kelas-card'
import imageKelas from '@public/images/list-kelas.png'
import BuatKelasModal from '@/components/page/pengajar/ruang-kelas/modal/buat-kelas'
import { useState } from 'react'

export default function ListKelasBody() {
  const [showModalBuatKelas, setShowModalBuatKelas] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <Title
            as="h5"
            weight="semibold"
            className="text-[1.375rem] leading-tight"
          >
            Semua Kelas yang Dikelola
          </Title>
          <Text size="sm" weight="semibold" variant="lighter">
            Semua kelas yang Kamu buat dan bisa dikelola
          </Text>
        </div>
        <Button size="sm" onClick={() => setShowModalBuatKelas(true)}>
          Tambah Kelas
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(10)].map((e, i) => {
          return <CardKelas key={i} image={imageKelas} />
        })}
      </div>

      <BuatKelasModal
        showModal={showModalBuatKelas}
        setShowModal={setShowModalBuatKelas}
      />
    </>
  )
}
