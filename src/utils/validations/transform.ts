export const inputToNumber = (val: string) =>
  parseFloat(val.replaceAll('.', '').replace(',', '.'))
