import { ReactNode } from 'react'
import { NumberInput, NumberInputProps } from 'rizzui'
import Input from './input'

export type InputNumberProps = Omit<
  NumberInputProps,
  'formatType' | 'onChange'
> & {
  label?: ReactNode
  onChange?(value: any): void
}

export default function InputRupiah({
  label,
  onChange,
  ...props
}: InputNumberProps) {
  return (
    <NumberInput
      // @ts-ignore
      label={label}
      formatType={'numeric'}
      displayType="input"
      customInput={CustomInput as React.ComponentType<unknown>}
      thousandSeparator="."
      decimalSeparator=","
      onChange={(val) => onChange && onChange(val)}
      onBlur={() => console.log('blur nih')}
      {...props}
    />
  )
}

function CustomInput({ ...props }) {
  return <Input prefix="Rp" {...props} />
}
