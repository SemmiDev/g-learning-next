'use client'

import { Button } from '@/components/ui'
import { useState } from 'react'
import UbahModal from './modal/ubah'

export default function UbahButton() {
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

      <UbahModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
