import { ReactNode } from 'react'
import { NumberInput, NumberInputProps } from 'rizzui'
import Input from './input'
import { inputToNumber } from '@/utils/validations/transform'

export type InputNumberProps = Omit<
  NumberInputProps,
  'formatType' | 'onChange'
> & {
  label?: ReactNode
  onChange?(value: any): void
  error?: string
}

export default function InputNumber({
  label,
  onChange,
  onBlur,
  error,
  customInput = Input as React.ComponentType<unknown>,
  ...props
}: InputNumberProps) {
  return (
    <NumberInput
      // @ts-ignore
      label={label}
      formatType={'numeric'}
      displayType="input"
      customInput={customInput}
      thousandSeparator="."
      decimalSeparator=","
      onChange={(e) =>
        onChange &&
        onChange(e.target.value ? inputToNumber(e.target.value) : undefined)
      }
      onBlur={onBlur}
      error={error}
      {...props}
    />
  )
}
