'use client'

import { Button, Title } from '@/components/ui'
import { useState } from 'react'
import TambahModal from './modal/tambah'
import TableInstansiCard from './table-instansi'

export default function ListInstansiBody() {
  const [showModalTambah, setShowModalTambah] = useState(false)
  const [showModalUbah, setShowModalUbah] = useState<number | null>(null)

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between space-x-2">
          <Title as="h4" size="1.5xl" weight="semibold">
            List instansi yang terdaftar
          </Title>
          <Button size="sm" onClick={() => setShowModalTambah(true)}>
            Tambah Instansi
          </Button>
        </div>
        <TableInstansiCard />
      </div>

      <TambahModal
        showModal={showModalTambah}
        setShowModal={setShowModalTambah}
      />
    </>
  )
}
