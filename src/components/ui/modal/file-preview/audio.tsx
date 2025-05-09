import ReactPlayer from 'react-player'
import Modal from '../modal'

type ModalAudioPreviewProps = {
  openUrl: string | undefined
  onClose: () => void
}

export default function ModalAudioPreview({
  openUrl,
  onClose,
}: ModalAudioPreviewProps) {
  return (
    <Modal isOpen={!!openUrl} onClose={onClose} bodyClassName="h-12 flex-auto">
      {!!openUrl && (
        <ReactPlayer url={openUrl} width="100%" height="100%" controls />
      )}
    </Modal>
  )
}
