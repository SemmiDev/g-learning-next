import { Loader } from 'rizzui'
import Button from '../../button/button'
import Modal from '../modal'
import { googleDriveId } from '@/utils/google-drive-url'
import Text from '../../text/text'

type ModalGoogleDrivePreviewProps = {
  openUrl: string | undefined
  onClose: () => void
}

export default function ModalGoogleDrivePreview({
  openUrl,
  onClose,
}: ModalGoogleDrivePreviewProps) {
  const id = openUrl ? googleDriveId(openUrl) : undefined

  return (
    <Modal size="full" isOpen={!!openUrl} onClose={onClose}>
      <Button
        variant="flat-colorful"
        className="absolute bottom-5 right-7 z-50"
        onClick={onClose}
      >
        Tutup
      </Button>
      {!!id ? (
        <>
          <Loader
            variant="spinner"
            color="primary"
            size="lg"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          />
          <iframe
            src={`https://drive.google.com/file/d/${id}/preview`}
            className="relative w-full h-dvh z-10"
          ></iframe>
        </>
      ) : (
        <Text>Url google drive tidak valid!</Text>
      )}
    </Modal>
  )
}
