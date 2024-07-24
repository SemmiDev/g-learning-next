'use client'

import { Button, Title } from '@/components/ui'
import { useState } from 'react'
import TambahModal from './modal/tambah'
import TableAdminCard from './table-admin'

export default function ManajemenAdminBody() {
  const [showModalTambah, setShowModalTambah] = useState(false)

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between space-x-2">
          <Title as="h4" size="1.5xl" weight="semibold">
            List admin
          </Title>
          <Button size="sm" onClick={() => setShowModalTambah(true)}>
            Tambah Admin
          </Button>
        </div>
        <TableAdminCard />
      </div>

      <TambahModal
        showModal={showModalTambah}
        setShowModal={setShowModalTambah}
      />
    </>
  )
}
