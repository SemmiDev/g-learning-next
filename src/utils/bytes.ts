export const formatBytes = (
  kilobytes: number,
  decimals = 2,
  nospace = false
) => {
  if (!+kilobytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['KB', 'MB', 'GB', 'TB']

  const i = Math.floor(Math.log(kilobytes) / Math.log(k))

  return `${parseFloat((kilobytes / Math.pow(k, i)).toFixed(dm))}${
    nospace ? '' : ' '
  }${sizes[i]}`
}
