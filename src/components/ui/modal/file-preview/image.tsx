import { Loader } from 'rizzui'
import Button from '../../button/button'
import Modal from '../../modal'
import Image from 'next/image'

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
      size="sm"
      rounded="none"
      isOpen={!!openUrl}
      containerClassName="relative w-fit bg-transparent shadow-none"
      onClose={onClose}
    >
      {!!openUrl && (
        <>
          <Loader
            variant="spinner"
            color="primary"
            size="lg"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          />
          <Image
            src={openUrl}
            alt="Preview"
            width={500}
            height={500}
            className="relative z-10"
          />
        </>
      )}
    </Modal>
  )
}
