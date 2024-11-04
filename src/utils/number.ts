export const roundedNumber = (num: number, digits = 2) => {
  const factor = 10 ** digits
  return Math.round(num * factor) / factor
}
