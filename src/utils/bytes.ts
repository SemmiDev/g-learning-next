const UNITSCALE = 1000

export const filesizeToKB = (size: number, unit: 'MB' | 'GB' | 'TB') => {
  const unitSize =
    unit === 'MB'
      ? UNITSCALE
      : unit === 'GB'
      ? Math.pow(UNITSCALE, 2)
      : unit === 'TB'
      ? Math.pow(UNITSCALE, 3)
      : 1

  return size * unitSize
}

export const formatBytes = (
  kilobytes: number,
  decimals = 2,
  nospace = false
) => {
  if (!+kilobytes) return '0 Bytes'

  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['KB', 'MB', 'GB', 'TB']

  const i = Math.floor(Math.log(kilobytes) / Math.log(UNITSCALE))

  return `${parseFloat((kilobytes / Math.pow(UNITSCALE, i)).toFixed(dm))}${
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
      ? UNITSCALE
      : unit === 'MB'
      ? Math.pow(UNITSCALE, 2)
      : unit === 'GB'
      ? Math.pow(UNITSCALE, 3)
      : 1
  const maxSize = max * unitSize

  return size > maxSize
}
