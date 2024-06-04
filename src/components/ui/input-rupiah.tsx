import { ReactNode } from 'react'
import { NumberInput, NumberInputProps } from 'rizzui'
import Input from './input'

export type InputRupiahProps = Omit<
  NumberInputProps,
  'formatType' | 'onChange'
> & {
  label?: ReactNode
  onChange?(value: any): void
  error?: string
}

export default function InputRupiah({
  label,
  onChange,
  onBlur,
  error,
  ...props
}: InputRupiahProps) {
  return (
    <NumberInput
      // @ts-ignore
      label={label}
      formatType={'numeric'}
      displayType="input"
      customInput={CustomInput as React.ComponentType<unknown>}
      thousandSeparator="."
      decimalSeparator=","
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      {...props}
    />
  )
}

function CustomInput({ ...props }) {
  return <Input prefix="Rp" {...props} />
}
