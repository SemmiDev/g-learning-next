'use client'

import { ActionIconTooltip } from '@/components/ui'
import { useState } from 'react'
import { LuCamera } from 'react-icons/lu'
import UbahLogoModal from './modal/ubah-logo'

export default function UbahLogoButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <ActionIconTooltip
        tooltip="Ganti Logo"
        size="sm"
        variant="flat"
        color="secondary"
        className="absolute top-1.5 right-1.5"
        onClick={() => setShowModal(true)}
      >
        <LuCamera />
      </ActionIconTooltip>

      <UbahLogoModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
