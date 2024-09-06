export const parseDate = (date: string | undefined) => {
  if (!date) return undefined

  return new Date(Date.parse(date))
}
