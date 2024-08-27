'use client'

import { Button, Title } from '@/components/ui'
import { fileSizeToKB } from '@/utils/bytes'
import PaketItemCard, { PaketItemType } from './paket-item-card'
import TambahModal from './modal/tambah'
import { useState } from 'react'

export default function PaketInstansiBody() {
  const [showTambahModal, setShowTambahModal] = useState(false)

  const listPaket: PaketItemType[] = [...Array(10)].map((_) => ({
    nama: 'Nama Paket',
    totalPenyimpanan: fileSizeToKB(1, 'TB'),
    penyimpananPengajar: fileSizeToKB(10, 'GB'),
    penyimpananPeserta: fileSizeToKB(1, 'GB'),
    limitUser: 5000,
    limitKelas: 500,
    limitKelasPengajar: 5,
    harga: 5000000,
  }))

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
