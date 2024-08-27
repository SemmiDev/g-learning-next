export const FILE_SIZE_UNIT_SCALE = 1024 as const

export const fileSizeToKB = (size: number, unit: 'MB' | 'GB' | 'TB') => {
  const scale =
    unit === 'GB'
      ? Math.pow(FILE_SIZE_UNIT_SCALE, 2)
      : unit === 'TB'
      ? Math.pow(FILE_SIZE_UNIT_SCALE, 3)
      : FILE_SIZE_UNIT_SCALE

  return size * scale
}

export const formatBytes = (
  kilobytes: number,
  decimals = 2,
  nospace = false
) => {
  if (!+kilobytes) return '0 KB'

  const dm = decimals < 0 ? 0 : decimals
  const units = ['KB', 'MB', 'GB', 'TB'] as const

  const unitSize = Math.floor(
    Math.log(kilobytes) / Math.log(FILE_SIZE_UNIT_SCALE)
  )

  return `${parseFloat(
    (kilobytes / Math.pow(FILE_SIZE_UNIT_SCALE, unitSize)).toFixed(dm)
  )}${nospace ? '' : ' '}${units[unitSize]}`
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
      ? FILE_SIZE_UNIT_SCALE
      : unit === 'MB'
      ? Math.pow(FILE_SIZE_UNIT_SCALE, 2)
      : unit === 'GB'
      ? Math.pow(FILE_SIZE_UNIT_SCALE, 3)
      : 1
  const maxSize = max * unitSize

  return size > maxSize
}
