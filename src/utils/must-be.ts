const isMustBe = <T>(array: readonly T[], value: unknown): value is T => {
  return array.some((val) => val === value)
}

export const mustBe = <T>(
  value: unknown,
  array: readonly T[],
  defaultValue: T
): T => {
  if (isMustBe<T>(array, value)) {
    return value
  }
  return defaultValue
}
