export const processData = <T, U, V>(
  value: T,
  process: (value: NonNullable<T>) => U,
  defaultValue: V
) => {
  if (value === undefined || value === null) return defaultValue
  return process(value)
}
