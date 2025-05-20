export const parseDate = (date: string | null | undefined) => {
  if (!date) return undefined

  return new Date(Date.parse(date))
}

export const parseDateFromTime = (date: string | null | undefined) => {
  if (!date) return undefined

  return new Date(Date.parse(`2025-01-01 ${date}`))
}
