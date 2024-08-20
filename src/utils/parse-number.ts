export const parseNumber = (number: string | number | undefined) => {
  if (number === undefined) return
  if (typeof number === 'number') return number

  return parseFloat(number.replace(/\./g, '').replace(/,/, '.'))
}
