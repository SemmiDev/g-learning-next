export const filesizeToKB = (size: number, unit: 'MB' | 'GB' | 'TB') => {
  const unitSize =
    unit === 'MB'
      ? 1024
      : unit === 'GB'
      ? 1024 * 1024
      : unit === 'TB'
      ? 1024 * 1024 * 1024
      : 1

  return size * unitSize
}

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

export type FileSizeUnit = 'B' | 'KB' | 'MB' | 'GB'

// return true if more than max size
export const checkMaxFileSize = (
  size: number,
  max: number,
  unit: FileSizeUnit
) => {
  const unitSize =
    unit === 'KB'
      ? 1024
      : unit === 'MB'
      ? 1024 * 1024
      : unit === 'GB'
      ? 1024 * 1024 * 1024
      : 1
  const maxSize = max * unitSize

  return size > maxSize
}
