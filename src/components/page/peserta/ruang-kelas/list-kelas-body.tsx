'use client'

import { Button, Text, Title } from '@/components/ui'
import imageKelas from '@public/images/list-kelas.png'
import { useState } from 'react'
import CardKelas from './kelas-card'

export default function ListKelasBody() {
  const [showModalGabungKelas, setShowModalGabungKelas] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <Title
            as="h5"
            weight="semibold"
            className="text-[1.375rem] leading-tight"
          >
            Semua Kelas yang Diikuti
          </Title>
          <Text size="sm" weight="semibold" variant="lighter">
            Semua daftar kelas yang Kamu kamu ikuti
          </Text>
        </div>
        <Button size="sm" onClick={() => setShowModalGabungKelas(true)}>
          Gabung ke Kelas
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(10)].map((e, i) => {
          return (
            <CardKelas
              program="Sistem Operasi"
              kelas="Kelas TI A"
              instansi="Nama Instansi"
              image={imageKelas}
              akses="Publik"
              key={i}
            />
          )
        })}
      </div>
    </>
  )
}
