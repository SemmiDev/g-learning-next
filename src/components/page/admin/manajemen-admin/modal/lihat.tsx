import {
  CardSeparator,
  Modal,
  ModalFooterButtons,
  TextBordered,
} from '@/components/ui'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { useEffect, useState } from 'react'

type DetailType = {
  foto?: string | StaticImport
  nama: string
  username: string
  email?: string
  kontak?: string
}

type UbahModalProps = {
  showModal?: number
  setShowModal(show?: number): void
}

export default function LihatModal({
  showModal,
  setShowModal,
}: UbahModalProps) {
  const [data, setData] = useState<DetailType>()

  useEffect(() => {
    setData({
      nama: 'Nama Asli',
      username: 'Admin',
      email: 'admin@gmail.com',
      kontak: '0812 3456 7890',
    })
  }, [showModal])

  return (
    <Modal
      title="Detail Admin"
      color="info"
      isOpen={!!showModal}
      onClose={() => setShowModal(undefined)}
    >
      <div className="flex flex-col gap-4 p-3">
        <TextBordered label="Nama Lengkap">{data?.nama}</TextBordered>
        <TextBordered label="Username">{data?.username}</TextBordered>
        <TextBordered label="Email">{data?.email || '-'}</TextBordered>
        <TextBordered label="Nomor Kontak">{data?.kontak || '-'}</TextBordered>
      </div>

      <CardSeparator />

      <ModalFooterButtons
        cancel="Tutup"
        onCancel={() => setShowModal(undefined)}
      />
    </Modal>
  )
}
