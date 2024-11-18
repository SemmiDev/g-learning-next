export const zeroPad = (number: number, digits: number = 2) =>
  String(number).padStart(digits, '0')
