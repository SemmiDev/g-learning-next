import {
  googleDriveDownloadUrl,
  googleDriveThumbnailUrl,
  isGoogleDriveUrl,
} from './google-drive-url'

export const downloadFileUrl = (url?: string) => {
  if (!url) return url

  if (isGoogleDriveUrl(url)) {
    const downloadUrl = googleDriveDownloadUrl(url)

    if (downloadUrl) return downloadUrl
  }

  return url
}

export const thumbnailFileUrl = (url?: string) => {
  if (!url) return url

  if (isGoogleDriveUrl(url)) {
    const thumbnailUrl = googleDriveThumbnailUrl(url)

    if (thumbnailUrl) return thumbnailUrl
  }

  return url
}
