'use client'

import { DataType } from '@/actions/pengguna/profil/data'
import { Button } from '@/components/ui'
import { useState } from 'react'
import UbahModal from './modal/ubah'

export default function UbahButton({ data }: { data: DataType }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        color="warning"
        onClick={() => setShowModal(true)}
      >
        Ubah Data
      </Button>

      <UbahModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={data}
      />
    </>
  )
}
