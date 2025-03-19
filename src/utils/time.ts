import { parseDate } from './date'

export const passedTime = (targetTime: string | undefined | null) => {
  const target = parseDate(targetTime)

  return !!target && target < new Date()
}

export const futureTime = (targetTime: string | undefined | null) => {
  const target = parseDate(targetTime)

  return !!target && target > new Date()
}

export const betweenTime = (
  startTime: string | undefined | null,
  endTime: string | undefined | null
) => {
  const current = new Date()
  const start = parseDate(startTime)
  const end = parseDate(endTime)

  return !!start && !!end && start <= current && end >= current
}

export const betweenTimeNonInclusive = (
  startTime: string | undefined | null,
  endTime: string | undefined | null
) => {
  const current = new Date()
  const start = parseDate(startTime)
  const end = parseDate(endTime)

  return !!start && !!end && start < current && end > current
}
