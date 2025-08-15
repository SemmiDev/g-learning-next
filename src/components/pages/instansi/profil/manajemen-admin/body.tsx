'use client'

import { Button, Title } from '@/components/ui'
import { useState } from 'react'
import TambahModal from './modal/tambah'
import TableProdiCard from './table-admin-card'

export default function ManajemenAdminBody() {
  const [showTambah, setShowTambah] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between gap-2 flex-wrap">
          <Title as="h4" size="1.5xl" weight="semibold">
            List admin fakultas/prodi yang terdaftar
          </Title>
          <div className="flex justify-end flex-grow">
            <Button
              size="sm"
              className="text-nowrap"
              onClick={() => setShowTambah(true)}
            >
              Tambah Admin
            </Button>
          </div>
        </div>
        <TableProdiCard />
      </div>

      <TambahModal show={showTambah} setShow={setShowTambah} />
    </>
  )
}
