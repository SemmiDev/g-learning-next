import Image from 'next/image'
import { useState } from 'react'
import Loader from '../../loader'
import Modal from '../../modal'

type ModalImagePreviewProps = {
  openUrl: string | undefined
  onClose: () => void
}

export default function ModalImagePreview({
  openUrl,
  onClose,
}: ModalImagePreviewProps) {
  const [loading, setLoading] = useState(true)

  return (
    <Modal
      size="lg"
      rounded="none"
      isOpen={!!openUrl}
      containerClassName="relative w-fit bg-transparent shadow-none"
      onClose={onClose}
    >
      {loading && <Loader className="bg-white/50 rounded-md p-4" />}
      {!!openUrl && (
        <Image
          src={openUrl}
          alt="Preview"
          width={1080}
          height={720}
          className="relative w-fit z-10"
          onLoad={() => setLoading(false)}
        />
      )}
    </Modal>
  )
}
