export const rupiah = (
  value: number,
  options?: {
    prefix: string
    maximumFractionDigits: number
  }
) => {
  const numberFormatter = new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    maximumFractionDigits: options?.maximumFractionDigits ?? 0,
  })

  return (options?.prefix || 'Rp ') + numberFormatter.format(value)
}
