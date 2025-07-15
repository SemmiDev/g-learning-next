import { inputToNumber } from '@/utils/validations/transform'
import { ReactNode, useMemo } from 'react'
import { NumberInput, NumberInputProps } from 'rizzui'
import Input, { InputProps } from './input'

export type InputNumberSeparatorProps = Omit<
  NumberInputProps,
  'formatType' | 'onChange' | 'size' | 'customInput'
> & {
  label?: ReactNode
  onChange?(value: number | null): void
  error?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  CustomInput?: React.ComponentType<unknown>
}

export default function InputNumberSeparator({
  label,
  onChange,
  onBlur,
  error,
  CustomInput = Input as React.ComponentType<unknown>,
  size,
  ...props
}: InputNumberSeparatorProps) {
  const customInput = useMemo(
    () =>
      ((props: InputProps) => (
        <CustomInput size={size} {...props} />
      )) as React.ComponentType<unknown>,
    [CustomInput, size]
  )

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
        onChange(e.target.value ? inputToNumber(e.target.value) : null)
      }
      onBlur={onBlur}
      error={error}
      {...props}
    />
  )
}
