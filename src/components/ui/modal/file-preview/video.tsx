import cn from '@/utils/class-names'
import ReactPlayer from 'react-player'
import Modal from '../modal'

type ModalVideoPreviewProps = {
  openUrl: string | undefined
  onClose: () => void
  platform?: boolean
}

export default function ModalVideoPreview({
  openUrl,
  onClose,
  platform,
}: ModalVideoPreviewProps) {
  return (
    <Modal
      size="xl"
      isOpen={!!openUrl}
      onClose={onClose}
      className="[&>div]:p-0"
      containerClassName="w-fit max-w-full bg-gray-dark/20"
      bodyClassName={cn(
        'w-[100dvw] max-w-[100dvw] max-h-[100dvh] xl:w-[1280px] xl:max-h-[calc(100dvh-3rem)]',
        {
          'aspect-video': platform,
        }
      )}
    >
      {!!openUrl && (
        <ReactPlayer url={openUrl} width="100%" height="100%" playing />
      )}
    </Modal>
  )
}
