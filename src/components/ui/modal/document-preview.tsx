import { Loader } from 'rizzui'
import Button from '../button/button'
import Modal from '../modal'

export type ModalDocumentPreviewProps = {
  openUrl: string | undefined
  onClose: () => void
}

export default function ModalDocumentPreview({
  openUrl,
  onClose,
}: ModalDocumentPreviewProps) {
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
            src={`https://docs.google.com/gview?url=${encodeURI(
              openUrl
            )}&embedded=true`}
            className="relative w-full h-screen z-10"
          ></iframe>
        </>
      )}
    </Modal>
  )
}
