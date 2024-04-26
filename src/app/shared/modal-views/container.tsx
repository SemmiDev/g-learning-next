'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Modal } from 'rizzui'
import { useModal } from '@/app/shared/modal-views/use-modal'

export default function GlobalModal() {
  const { isOpen, view, closeModal, size, customSize } = useModal()
  const pathname = usePathname()

  useEffect(() => {
    closeModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      size={size}
      customSize={customSize}
      overlayClassName="cursor-auto"
      containerClassName="overflow-clip"
      className="z-[9999]"
    >
      {view}
    </Modal>
  )
}
