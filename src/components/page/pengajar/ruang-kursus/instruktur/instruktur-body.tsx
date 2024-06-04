'use client'

import { Button, Text } from '@/components/ui'
import emptyIcon from '@public/icons/empty.svg'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import { useState } from 'react'
import BuatKursusModal from './modal/buat-kursus'

export default function RuangKursusInstrukturBody() {
  const [showModalBuatKursus, setShowModalBuatKursus] = useState(false)

  const openModalBuatKursus = () => setShowModalBuatKursus(true)

  const isEmpty = true

  return (
    <>
      {!isEmpty ? (
        <Body />
      ) : (
        <EmptyBody openModalBuatKursus={openModalBuatKursus} />
      )}

      <BuatKursusModal
        showModal={showModalBuatKursus}
        setShowModal={setShowModalBuatKursus}
      />
    </>
  )
}

function Body() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex flex-col w-1/3 bg-yellow-100">
        <div className="flex flex-col items-center">
          <figure className="size-28 rounded-md">
            <Image src={imagePhoto} alt="Foto" />
          </figure>
          <Text weight="semibold" variant="dark">
            Kremka liskta
          </Text>
          <Text weight="medium" variant="lighter">
            Dosen, Enterpreneur
          </Text>
          <Text size="sm" weight="medium" variant="lighter">
            Sa Saya adalah seorang dosen sekaligus praktisi yang sudah
            berkecimpung di dalam kolam yang hangat di musim dingin ini
          </Text>
        </div>
        <div className="flex"></div>
      </div>
      <div className="flex flex-1 bg-blue-50">Kanan</div>
    </div>
  )
}

function EmptyBody({ openModalBuatKursus }: { openModalBuatKursus(): void }) {
  return (
    <div className="flex flex-col items-center pt-20">
      <figure className="size-48">
        <Image src={emptyIcon} alt="Kosong" />
      </figure>
      <Text weight="bold" className="text-[1.375rem] mt-4">
        Kursus Anda masih kosong!
      </Text>
      <Button className="mt-2" onClick={openModalBuatKursus}>
        Mulai Buat Kursus
      </Button>
    </div>
  )
}
