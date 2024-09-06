'use client'

import { Button, Title } from '@/components/ui'
import { useState } from 'react'
import TambahModal from './modal/tambah'
import TablePembayaranInstansiCard from './table-card'

export default function PembayaranInstansiBody() {
  const [showModalTambah, setShowModalTambah] = useState(false)

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between space-x-2">
          <Title as="h4" size="1.5xl" weight="semibold">
            List Pembayaran Instansi
          </Title>
          <Button size="sm" onClick={() => setShowModalTambah(true)}>
            Invoice Baru
          </Button>
        </div>
        <TablePembayaranInstansiCard />
      </div>

      <TambahModal
        showModal={showModalTambah}
        setShowModal={setShowModalTambah}
      />
    </>
  )
}
