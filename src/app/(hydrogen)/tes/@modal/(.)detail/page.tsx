'use client'

import { useRouter } from 'next/navigation'
import { MdOutlineClose } from 'react-icons/md'
import { ActionIcon, Modal, Text, Title } from 'rizzui'

export default function TesDetailModal() {
  const router = useRouter()

  const closeModal = () => {
    router.back()
  }

  return (
    <Modal isOpen={true} onClose={closeModal} overlayClassName="cursor-auto">
      <div className="m-auto px-6 py-4">
        <div className="mb-4 flex items-center justify-between">
          <Title as="h3">Testing Modal</Title>
          <ActionIcon size="sm" variant="text" onClick={closeModal}>
            <MdOutlineClose size={18} />
          </ActionIcon>
        </div>
        <div>
          <Text>This is testing modal.</Text>
        </div>
      </div>
    </Modal>
  )
}
