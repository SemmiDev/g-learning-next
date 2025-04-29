'use client'

import { isGoogleDriveUrl } from '@/utils/google-drive-url'
import { isDocumentExt, isImageExt, isPlayableVideo } from '@/utils/media-check'
import ModalDocumentPreview from './document'
import ModalGoogleDrivePreview from './google-drive'
import ModalImagePreview from './image'
import ModalVideoPreview from './video'

export type FilePreviewType = {
  url: string
  extension?: string
}

export const isPreviewableFile = (url: string, extension?: string) => {
  return (
    isDocumentExt(url, extension) ||
    isImageExt(url, extension) ||
    isPlayableVideo(url) ||
    isGoogleDriveUrl(url)
  )
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

  if (isImageExt(file.url, file.extension)) {
    return <ModalImagePreview openUrl={file.url} onClose={onClose} />
  }

  if (isPlayableVideo(file.url)) {
    return <ModalVideoPreview openUrl={file.url} onClose={onClose} />
  }

  if (isGoogleDriveUrl(file.url)) {
    return <ModalGoogleDrivePreview openUrl={file.url} onClose={onClose} />
  }

  return null
}
