import cn from '@/utils/class-names'
import {
  googleDriveThumbnailUrl,
  isGoogleDriveUrl,
} from '@/utils/google-drive-url'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import Loader from '../../loader'
import Modal from '../modal'

type ModalImagePreviewProps = {
  openUrl: string | undefined
  onClose: () => void
}

export default function ModalImagePreview({
  openUrl,
  onClose,
}: ModalImagePreviewProps) {
  const [loading, setLoading] = useState(true)

  const imageUrl = useMemo(
    () =>
      isGoogleDriveUrl(openUrl ?? '')
        ? googleDriveThumbnailUrl(openUrl ?? '', openUrl, 1280)
        : openUrl,
    [openUrl]
  )

  return (
    <Modal
      size="lg"
      rounded="none"
      isOpen={!!imageUrl}
      containerClassName="relative w-fit bg-transparent shadow-none"
      onClose={onClose}
    >
      {loading && <Loader className="bg-white/50 rounded-md p-4" />}
      {!!imageUrl && (
        <Image
          src={imageUrl}
          alt="Preview"
          width={1280}
          height={720}
          className={cn({ 'w-fit': loading })}
          onLoad={() => setLoading(false)}
        />
      )}
    </Modal>
  )
}
