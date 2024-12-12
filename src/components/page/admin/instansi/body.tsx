'use client'

import { Button, Title } from '@/components/ui'
import { useState } from 'react'
import TambahModal from './modal/tambah'
import TableInstansiCard from './table-instansi-card'

export default function ListInstansiBody() {
  const [showTambah, setShowTambah] = useState(false)

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between space-x-2">
          <Title as="h4" size="1.5xl" weight="semibold">
            List instansi yang terdaftar
          </Title>
          <Button
            size="sm"
            className="text-nowrap"
            onClick={() => setShowTambah(true)}
          >
            Tambah Instansi
          </Button>
        </div>
        <TableInstansiCard />
      </div>

      <TambahModal show={showTambah} setShow={setShowTambah} />
    </>
  )
}
