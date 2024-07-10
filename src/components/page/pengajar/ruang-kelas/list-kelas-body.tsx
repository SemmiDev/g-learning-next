'use client'

import BuatKelasModal from '@/components/page/pengajar/ruang-kelas/modal/buat-kelas'
import { Button, Text, Title } from '@/components/ui'
import imageKelas from '@public/images/list-kelas.png'
import { useState } from 'react'
import CardKelas from './kelas-card'
import PengaturanKelasModal from './modal/pengaturan-kelas'

export default function ListKelasBody() {
  const [showModalBuatKelas, setShowModalBuatKelas] = useState(false)
  const [showModalPengaturanKelas, setShowModalPengaturanKelas] =
    useState(false)

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
          Tambah Kelas
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(10)].map((e, i) => {
          return (
            <CardKelas
              program="Sistem Operasi"
              kelas="Kelas TI A"
              image={imageKelas}
              akses="Publik"
              onClickPengaturan={() => setShowModalPengaturanKelas(true)}
              key={i}
            />
          )
        })}
      </div>

      <BuatKelasModal
        showModal={showModalBuatKelas}
        setShowModal={setShowModalBuatKelas}
      />

      <PengaturanKelasModal
        showModal={showModalPengaturanKelas}
        setShowModal={setShowModalPengaturanKelas}
      />
    </>
  )
}
