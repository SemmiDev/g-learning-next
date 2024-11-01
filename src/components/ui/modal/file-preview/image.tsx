import Image from 'next/image'
import Modal from '../../modal'

type ModalImagePreviewProps = {
  openUrl: string | undefined
  onClose: () => void
}

export default function ModalImagePreview({
  openUrl,
  onClose,
}: ModalImagePreviewProps) {
  return (
    <Modal
      size="lg"
      rounded="none"
      isOpen={!!openUrl}
      containerClassName="relative w-fit bg-transparent shadow-none"
      onClose={onClose}
    >
      {!!openUrl && (
        <Image
          src={openUrl}
          alt="Preview"
          width={1080}
          height={720}
          className="relative w-fit z-10"
        />
      )}
    </Modal>
  )
}
