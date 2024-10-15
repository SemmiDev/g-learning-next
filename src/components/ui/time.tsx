'use client'

import 'moment/locale/id'
import Moment, { MomentProps } from 'react-moment'

type TimeFormat =
  | 'date'
  | 'datetime'
  | 'datetimeday'
  | 'dateday'
  | 'dateshort'
  | 'datetimeshort'
  | 'time'

const getFormat = (format: TimeFormat | string, seconds: boolean = false) => {
  const fDate = 'DD MMMM YYYY'
  const fDateShort = 'DD/MM/YYYY'
  const fTime = `HH:mm${seconds ? ':ss' : ''}`

  switch (format) {
    case 'date':
      return fDate
    case 'dateday':
      return `dddd, ${fDate}`
    case 'datetime':
      return `${fDate} | ${fTime}`
    case 'datetimeday':
      return `dddd, ${fDate} | ${fTime}`
    case 'dateshort':
      return `${fDateShort}`
    case 'datetimeshort':
      return `${fDateShort} | ${fTime}`
    case 'time':
      return fTime
    default:
      return format
  }
}

export type TimeProps = {
  date: MomentProps['date'] | undefined | null
  format?: TimeFormat
  customFormat?: string
  seconds?: boolean
  fromNow?: boolean
  empty?: string
  momentProps?: Omit<MomentProps, 'date' | 'format' | 'fromNow'>
}

export default function Time({
  date,
  format = 'date',
  customFormat,
  seconds = false,
  fromNow,
  empty,
  momentProps,
}: TimeProps) {
  if (
    empty !== undefined &&
    empty !== null &&
    (!date || date === '0001-01-01T00:00:00Z')
  ) {
    return <time>{empty}</time>
  }

  return (
    <Moment
      date={date || undefined}
      format={!fromNow ? getFormat(customFormat || format, seconds) : undefined}
      locale="id"
      fromNow={fromNow}
      {...momentProps}
    />
  )
}
