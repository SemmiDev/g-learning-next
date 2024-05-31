'use client'

import { ActionIcon, Button } from '@/components/ui'
import { useState } from 'react'
import { GrShareOption } from 'react-icons/gr'
import PengaturanKelasModal from '../modal/pengaturan-kelas'

export default function KelasHeaderAction() {
  const [showModalPengaturanKelas, setShowModalPengaturanKelas] =
    useState(false)

  return (
    <>
      <div className="flex space-x-2 items-center">
        <ActionIcon size="sm" variant="outline">
          <GrShareOption size={16} />
        </ActionIcon>
        <Button
          size="sm"
          className="h-7"
          onClick={() => setShowModalPengaturanKelas(true)}
        >
          Pengaturan
        </Button>
      </div>

      <PengaturanKelasModal
        showModal={showModalPengaturanKelas}
        setShowModal={setShowModalPengaturanKelas}
      />
    </>
  )
}
