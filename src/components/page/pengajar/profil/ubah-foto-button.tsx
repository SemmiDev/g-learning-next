'use client'

import { ActionIconTooltip } from '@/components/ui'
import { useState } from 'react'
import { LuCamera } from 'react-icons/lu'
import UbahFotoModal from './modal/ubah-foto'

export default function UbahFotoButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <ActionIconTooltip
        tooltip="Ganti Foto"
        size="sm"
        variant="flat"
        color="secondary"
        className="absolute top-1.5 right-1.5"
        onClick={() => setShowModal(true)}
      >
        <LuCamera />
      </ActionIconTooltip>

      <UbahFotoModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
