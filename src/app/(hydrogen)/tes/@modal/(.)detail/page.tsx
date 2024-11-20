'use client'

import { ActionIcon, Text, Title } from '@/components/ui'
import { useRouter } from 'next-nprogress-bar'
import { MdOutlineClose } from 'react-icons/md'
import { Modal } from 'rizzui'

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
