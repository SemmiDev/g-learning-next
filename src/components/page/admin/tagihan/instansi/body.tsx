'use client'

import { Button, Title } from '@/components/ui'
import { useState } from 'react'
import TambahModal from './modal/tambah'
import TableTagihanInstansiCard from './table-card'

export default function TagihanInstansiBody() {
  const [showTambah, setShowTambah] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between gap-x-2">
          <Title as="h4" size="1.5xl" weight="semibold">
            List Tagihan Instansi
          </Title>
          <Button
            size="sm"
            className="text-nowrap"
            onClick={() => setShowTambah(true)}
          >
            Tagihan Baru
          </Button>
        </div>
        <TableTagihanInstansiCard />
      </div>

      <TambahModal show={showTambah} setShow={setShowTambah} />
    </>
  )
}
