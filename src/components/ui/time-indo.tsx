import { getWaktuIndonesia } from '@/utils/client-timezone'
import Time, { TimeProps } from './time'

export type TimeIndoProps = TimeProps & {}

export default function TimeIndo({
  date,
  format = 'datetime',
  empty,
  ...props
}: TimeIndoProps) {
  if (empty !== undefined && (!date || date === '0001-01-01T00:00:00Z')) {
    return <span>{empty}</span>
  }

  return (
    <span>
      <Time date={date} format={format} {...props} />{' '}
      <span>{getWaktuIndonesia()}</span>
    </span>
  )
}
