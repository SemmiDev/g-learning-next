const isMustBe = <T>(array: unknown[], value: unknown): value is T => {
  return array.some((val) => val === value)
}

export const mustBe = <T>(
  value: unknown,
  array: unknown[],
  defaultValue: T
): T => {
  if (isMustBe<T>(array, value)) {
    return value
  }
  return defaultValue
}
