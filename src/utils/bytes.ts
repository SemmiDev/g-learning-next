export const fileSizeUnitScale = 1024

export const fileSizeToKB = (size: number, unit: 'MB' | 'GB' | 'TB') => {
  const unitSize =
    unit === 'MB'
      ? fileSizeUnitScale
      : unit === 'GB'
      ? Math.pow(fileSizeUnitScale, 2)
      : unit === 'TB'
      ? Math.pow(fileSizeUnitScale, 3)
      : 1

  return size * unitSize
}

export const formatBytes = (
  kilobytes: number,
  decimals = 2,
  nospace = false
) => {
  if (!+kilobytes) return '0 KB'

  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['KB', 'MB', 'GB', 'TB']

  const i = Math.floor(Math.log(kilobytes) / Math.log(fileSizeUnitScale))

  return `${parseFloat(
    (kilobytes / Math.pow(fileSizeUnitScale, i)).toFixed(dm)
  )}${nospace ? '' : ' '}${sizes[i]}`
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
      ? fileSizeUnitScale
      : unit === 'MB'
      ? Math.pow(fileSizeUnitScale, 2)
      : unit === 'GB'
      ? Math.pow(fileSizeUnitScale, 3)
      : 1
  const maxSize = max * unitSize

  return size > maxSize
}
