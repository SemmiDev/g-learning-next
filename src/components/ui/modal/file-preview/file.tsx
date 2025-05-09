'use client'

import { PustakaMediaFileType } from '@/components/shared/pustaka-media'
import { isGoogleDriveUrl } from '@/utils/google-drive-url'
import {
  isAudioExt,
  isDocumentExt,
  isImageExt,
  isPlayableVideo,
  isVideoExt,
} from '@/utils/media-check'
import ModalAudioPreview from './audio'
import ModalDocumentPreview from './document'
import ModalGoogleDrivePreview from './google-drive'
import ModalImagePreview from './image'
import ModalVideoPreview from './video'

export type FilePreviewType = {
  url: string
  extension?: string
  image?: boolean
}

export const isPreviewableFile = (url: string, extension?: string) => {
  return (
    isDocumentExt(url, extension) ||
    isImageExt(url, extension) ||
    isPlayableVideo(url) ||
    isGoogleDriveUrl(url)
  )
}

export const isPreviewableType = (type: PustakaMediaFileType['type']) => {
  return type === 'image'
}

export type ModalFilePreviewProps = {
  file: FilePreviewType | undefined
  onClose: () => void
}

export default function ModalFilePreview({
  file,
  onClose,
}: ModalFilePreviewProps) {
  if (!file) return null

  if (isDocumentExt(file.url, file.extension)) {
    return <ModalDocumentPreview openUrl={file.url} onClose={onClose} />
  }

  if (isImageExt(file.url, file.extension) || file.image) {
    return <ModalImagePreview openUrl={file.url} onClose={onClose} />
  }

  if (isAudioExt(file.url)) {
    return <ModalAudioPreview openUrl={file.url} onClose={onClose} />
  }

  if (isPlayableVideo(file.url)) {
    return (
      <ModalVideoPreview
        openUrl={file.url}
        onClose={onClose}
        platform={!isVideoExt(file.url, file.extension)}
      />
    )
  }

  if (isGoogleDriveUrl(file.url)) {
    return <ModalGoogleDrivePreview openUrl={file.url} onClose={onClose} />
  }

  return null
}
