'use client'

import { Button, Title } from '@/components/ui'
import { useState } from 'react'
import TambahModal from './modal/tambah'
import TableAdminCard from './table-admin-card'

export default function ManajemenAdminBody() {
  const [showTambah, setShowTambah] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between gap-x-2">
          <Title as="h4" size="1.5xl" weight="semibold">
            List admin
          </Title>
          <Button size="sm" onClick={() => setShowTambah(true)}>
            Tambah Admin
          </Button>
        </div>
        <TableAdminCard />
      </div>

      <TambahModal show={showTambah} setShow={setShowTambah} />
    </>
  )
}
