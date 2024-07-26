import {
  CardSeparator,
  Modal,
  ModalFooterButtons,
  TextBordered,
} from '@/components/ui'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { useEffect, useState } from 'react'

type DetailType = {
  foto?: string | StaticImport | null
  nama: string
  username: string
  email?: string | null
  kontak?: string | null
}

type UbahModalProps = {
  showModal?: number | null
  setShowModal(show: number | null): void
}

export default function LihatModal({
  showModal = null,
  setShowModal,
}: UbahModalProps) {
  const [data, setData] = useState<DetailType | null>()

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
      onClose={() => setShowModal(null)}
    >
      <div className="flex flex-col gap-4 p-3">
        <TextBordered label="Nama Lengkap">{data?.nama}</TextBordered>
        <TextBordered label="Username">{data?.username}</TextBordered>
        <TextBordered label="Email">{data?.email || '-'}</TextBordered>
        <TextBordered label="Nomor Kontak">{data?.kontak || '-'}</TextBordered>
      </div>

      <CardSeparator />

      <ModalFooterButtons cancel="Tutup" onCancel={() => setShowModal(null)} />
    </Modal>
  )
}
