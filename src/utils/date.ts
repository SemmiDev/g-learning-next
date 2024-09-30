export const parseDate = (date: string | undefined) => {
  if (!date) return undefined

  return new Date(Date.parse(date))
}
export const parseDateFromTime = (date: string | undefined) => {
  if (!date) return undefined

  return new Date(Date.parse(`2024-01-01 ${date}`))
}
