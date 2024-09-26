'use client'

export const getTimeZone = () => {
  const timezoneOffset = new Date().getTimezoneOffset()
  const offset = Math.abs(timezoneOffset)
  const offsetOperator = timezoneOffset < 0 ? '+' : '-'
  const offsetHours = Math.floor(offset / 60)
    .toString()
    .padStart(2, '0')
  const offsetMinutes = Math.floor(offset % 60)
    .toString()
    .padStart(2, '0')

  return `${offsetOperator}${offsetHours}:${offsetMinutes}`
}

export const getWaktuIndonesia = () => {
  switch (getTimeZone()) {
    case '+07:00':
      return 'WIB'
    case '+08:00':
      return 'WITA'
    case '+09:00':
      return 'WIT'
    default:
      return ''
  }
}
