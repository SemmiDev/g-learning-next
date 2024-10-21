export const switchCaseArray = <
  TV extends unknown,
  TC extends unknown,
  TR extends unknown,
  TD extends unknown
>(
  value: TV,
  arrayCompare: (TV | TC)[],
  arrayReturn: TR[],
  defaultValue: TD
) => {
  return arrayReturn[arrayCompare.indexOf(value)] ?? defaultValue
}

export const switchCaseObject = <TR extends unknown, TD extends unknown>(
  value: string | number | symbol | undefined | null,
  object: Record<string | number | symbol, TR>,
  defaultValue: TD
) => {
  if (value === undefined || value === null) return defaultValue

  return object[value] ?? defaultValue
}
