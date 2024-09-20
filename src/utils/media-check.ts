export const isDocumentExt = (url: string, extension?: string) => {
  let ext = extension ?? url.split('.').pop() ?? ''

  return ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'].includes(ext)
}

export const isImageExt = (url: string, extension?: string) => {
  let ext = extension ?? url.split('.').pop() ?? ''

  return ['jpg', 'jpeg', 'png', 'bmp'].includes(ext)
}
