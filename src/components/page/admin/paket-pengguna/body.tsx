'use client'

import { Button, Title } from '@/components/ui'
import { filesizeToKB } from '@/utils/bytes'
import { listObjectFromList } from '@/utils/object'
import { useState } from 'react'
import TambahModal from './modal/tambah'
import PaketItemCard, { PaketItemType } from './paket-item-card'

export default function PaketPenggunaBody() {
  const [showTambahModal, setShowTambahModal] = useState(false)

  const listPaket: PaketItemType[] = listObjectFromList(
    [
      {
        nama: 'Basic',
        totalPenyimpanan: filesizeToKB(5, 'GB'),
        limitKelas: 5,
        harga: 75000,
      },
      {
        nama: 'Premium',
        totalPenyimpanan: filesizeToKB(10, 'GB'),
        limitKelas: 10,
        harga: 100000,
      },
      {
        nama: 'Advance',
        totalPenyimpanan: filesizeToKB(15, 'GB'),
        limitKelas: 15,
        harga: 125000,
      },
      {
        nama: 'Free',
        totalPenyimpanan: filesizeToKB(1, 'GB'),
        limitKelas: 3,
        harga: 0,
      },
    ],
    10
  )

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <Title as="h4" size="1.5xl" weight="semibold">
            List Paket Instansi
          </Title>
          <Button size="sm" onClick={() => setShowTambahModal(true)}>
            Buat Paket Baru
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
          {listPaket.map((paket, idx) => (
            <PaketItemCard paket={paket} key={idx} />
          ))}
        </div>
      </div>

      <TambahModal
        showModal={showTambahModal}
        setShowModal={setShowTambahModal}
      />
    </>
  )
}
