export const isImgurUrl = (url: string) => {
  return /^(?:https?:\/\/)?(?:[a-z]+\.)?imgur\.com/.test(url)
}

export const imgurId = (url: string) => {
  const match = url.match(
    /^https?:\/\/(?:[a-z]+\.)?imgur\.com\/(?:[a-z0-9]+(?:\/)?)(?:[a-z0-9]+)?$/
  )

  if (match) {
    const parts = url.split('/')
    const lastPart = parts.pop()
    if (lastPart) return lastPart
    else if (parts.length > 0) return parts.pop()
    else return null
  } else {
    return null
  }
}
