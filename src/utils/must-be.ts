const isMustBe = <T>(array: readonly unknown[], value: unknown): value is T => {
  return array.some((val) => val === value)
}

export const mustBe = <T>(
  value: unknown,
  array: readonly unknown[],
  defaultValue: T
): T => {
  if (isMustBe<T>(array, value)) {
    return value
  }
  return defaultValue
}
