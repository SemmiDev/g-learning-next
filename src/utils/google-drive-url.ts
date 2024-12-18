export const isGoogleDriveUrl = (url: string) => {
  return /^(?:https?:\/\/)?drive\.google\.com/.test(url)
}

export const googleDriveId = (url: string) => {
  let id =
    /.+file\/d\/(?<id>[a-zA-Z0-9\_\-]+).*\/.*/.exec(url)?.groups?.['id'] ?? null
  if (id != null) return id

  id = /.+uc\?id=(?<id>[a-zA-Z0-9\_\-]+).*/.exec(url)?.groups?.['id'] ?? null
  if (id != null) return id

  return id
}

export const googleDriveDownloadUrl = (url: string, defaultBack?: string) => {
  const id = googleDriveId(url)

  if (!id) return defaultBack

  return `https://drive.google.com/uc?id=${id}&export=download`
}

export const googleDriveViewUrl = (url: string, defaultBack?: string) => {
  const id = googleDriveId(url)

  if (!id) return defaultBack

  return `https://drive.google.com/file/d/${id}/view`
}

export const googleDriveThumbnailUrl = (
  url: string,
  defaultBack?: string,
  size: number = 150,
  type: 's' | 'w' | 'h' = 's'
) => {
  const id = googleDriveId(url)

  if (!id) return defaultBack

  return `https://drive.google.com/thumbnail?id=${id}&sz=${size}${type}`
}
