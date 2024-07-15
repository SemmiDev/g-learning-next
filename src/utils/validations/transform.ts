export const rupiahToNumber = (val: string) =>
  parseFloat(val.replaceAll('.', '').replace(',', '.'))
