export function formatNumberShort(value: number): string {
  const numberFormatter = new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    maximumFractionDigits: 2,
  })

  // Check if the value is less than 0
  if (value < 0) {
    // Handle negative values separately and format the absolute value
    const absoluteValue = Math.abs(value)
    return `-${formatNumberShort(absoluteValue)}`
  } else if (value >= 1e12) {
    // Format the value in billions
    const formattedValue = value / 1e12
    return `${numberFormatter.format(formattedValue)}T`
  } else if (value >= 1e9) {
    // Format the value in billions
    const formattedValue = value / 1e9
    return `${numberFormatter.format(formattedValue)}B`
  } else if (value >= 1e6) {
    // Check if the value is between 1 million and 1 billion
    // Format the value in millions
    const formattedValue = value / 1e6
    return `${numberFormatter.format(formattedValue)}M`
  } else if (value >= 1000) {
    // Check if the value is between 1 thousand and 1 million
    // Format the value in thousands
    const formattedValue = value / 1000
    return `${numberFormatter.format(formattedValue)}K`
  } else {
    // If the value is less than 1 thousand, return the original value as a string
    return value.toString()
  }
}

export function formatNumberSeparator(
  value: number,
  options?: {
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  }
): string {
  const numberFormatter = new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: options?.minimumFractionDigits,
    maximumFractionDigits: options?.maximumFractionDigits,
  })

  return numberFormatter.format(value)
}
