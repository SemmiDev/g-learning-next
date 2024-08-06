'use client'

import 'moment/locale/id'
import Moment, { MomentProps } from 'react-moment'

type TimeFormat = 'date' | 'datetime' | 'datetimeday' | 'dateday' | 'time'

const getFormat = (format: TimeFormat, seconds: boolean = false) => {
  const fDate = 'DD MMMM YYYY'
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
    case 'time':
      return fTime
    default:
      return format
  }
}

export type TimeProps = {
  date?: MomentProps['date']
  format?: TimeFormat
  seconds?: boolean
  fromNow?: boolean
  momentProps?: Omit<MomentProps, 'date' | 'format' | 'fromNow'>
}

export default function Time({
  date,
  format = 'date',
  seconds = false,
  fromNow,
  momentProps,
}: TimeProps) {
  return (
    <Moment
      date={date}
      format={!fromNow ? getFormat(format, seconds) : undefined}
      locale="id"
      fromNow={fromNow}
      {...momentProps}
    />
  )
}
