import { formatNumberSeparator } from './format-number'

export const angka = (
  value: number,
  options?: {
    prefix?: string
    maximumFractionDigits?: number
  }
) => {
  const formattedNumber = formatNumberSeparator(value, {
    maximumFractionDigits: options?.maximumFractionDigits ?? 0,
  })

  return (options?.prefix || '') + formattedNumber
}

export const rupiah = (
  value: number,
  options?: {
    prefix?: string
    maximumFractionDigits: number
  }
) =>
  angka(value, {
    prefix: options?.prefix || 'Rp ',
    maximumFractionDigits: options?.maximumFractionDigits,
  })

export const stripHtml = (html: string) => {
  return html.replace(/(<([^>]+)>)/gi, '')
}
