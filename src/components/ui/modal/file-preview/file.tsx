'use client'

import { isDocumentExt, isImageExt, isVideoUrl } from '@/utils/media-check'
import ModalDocumentPreview from './document'
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
    isVideoUrl(url)
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

  if (isVideoUrl(file.url)) {
    return <ModalVideoPreview openUrl={file.url} onClose={onClose} />
  }

  return null
}
