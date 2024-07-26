'use client'

import { Button } from '@/components/ui'
import { useState } from 'react'
import UbahSandiModal from './modal/ubah-sandi'

export default function UbahSandiButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        color="warning"
        onClick={() => setShowModal(true)}
      >
        Ubah Kata Sandi
      </Button>

      <UbahSandiModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
