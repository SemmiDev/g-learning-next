export function base64PngToFile(base64: string, fileName: string) {
  const dataBase64 = base64.split(',', 2)
  const dataString = dataBase64[1]
  const imageContent = atob(dataString)
  const buffer = new ArrayBuffer(imageContent.length)
  const view = new Uint8Array(buffer)

  for (let n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n)
  }

  const type = 'image/png'
  const blob = new Blob([buffer], { type })

  return new File([blob], fileName, {
    lastModified: new Date().getTime(),
    type,
  })
}
