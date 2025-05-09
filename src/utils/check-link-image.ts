export const SUPPORTED_LINK_IMAGE_ERROR_MESSAGE =
  'Link dengan tipe gambar hanya support link dari imgur (i.imgur.com) dan google drive (drive.google.com)'

export const checkSupportedLinkImage = (link: string) => {
  return /i\.imgur\.com|drive\.google\.com/.test(link)
}
