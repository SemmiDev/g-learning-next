'use client'

import { Button, Title } from '@/components/ui'
import { useState } from 'react'
import TambahModal from './modal/tambah'
import TableTagihanPenggunaCard from './table-card'

export default function TagihanPenggunaBody() {
  const [showTambah, setShowTambah] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between gap-x-2">
          <Title as="h4" size="1.5xl" weight="semibold">
            List Tagihan Pengguna
          </Title>
          <Button
            size="sm"
            className="text-nowrap"
            onClick={() => setShowTambah(true)}
          >
            Tagihan Baru
          </Button>
        </div>
        <TableTagihanPenggunaCard />
      </div>

      <TambahModal show={showTambah} setShow={setShowTambah} />
    </>
  )
}
