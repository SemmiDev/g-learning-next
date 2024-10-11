import ReactPlayer from 'react-player'
import Modal from '../../modal'

type ModalVideoPreviewProps = {
  openUrl: string | undefined
  onClose: () => void
}

export default function ModalVideoPreview({
  openUrl,
  onClose,
}: ModalVideoPreviewProps) {
  return (
    <Modal
      size="xl"
      isOpen={!!openUrl}
      onClose={onClose}
      containerClassName="bg-transparent"
      bodyClassName="aspect-video"
    >
      {!!openUrl && <ReactPlayer url={openUrl} width="100%" height="100%" />}
    </Modal>
  )
}
