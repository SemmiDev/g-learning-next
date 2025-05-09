import ReactPlayer from 'react-player'

export const isDocumentExt = (url: string, extension?: string) => {
  const ext = extension ?? url.split('.').pop() ?? ''

  return ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'].includes(ext)
}

export const isImageExt = (url: string, extension?: string) => {
  const ext = extension ?? url.split('.').pop() ?? ''

  return ['jpg', 'jpeg', 'jfif', 'png', 'bmp'].includes(ext)
}

export const isAudioExt = (url: string, extension?: string) => {
  const ext = extension ?? url.split('.').pop() ?? ''

  return ['mp3', 'ogg', 'wav'].includes(ext)
}

export const isVideoExt = (url: string, extension?: string) => {
  const ext = extension ?? url.split('.').pop() ?? ''

  return ['mp4', 'webm'].includes(ext)
}

export const isPlayableVideo = (url: string) => {
  return ReactPlayer.canPlay(url)
}
