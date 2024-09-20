import { Loader } from 'rizzui'
import Button from '../../button/button'
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
    <Modal size="full" isOpen={!!openUrl}>
      <Button
        variant="flat-colorful"
        className="absolute bottom-5 right-7 z-50"
        onClick={onClose}
      >
        Tutup
      </Button>
      {!!openUrl && (
        <>
          <Loader
            variant="spinner"
            color="primary"
            size="lg"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          />
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(
              openUrl
            )}&embedded=true`}
            className="relative w-full h-screen z-10"
          ></iframe>
        </>
      )}
    </Modal>
  )
}
