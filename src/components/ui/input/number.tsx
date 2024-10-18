import cn from '@/utils/class-names'
import Label from '../label'
import Input, { InputProps } from './input'

export type InputNumberProps = Omit<
  InputProps,
  'type' | 'onChange' | 'phoneNumber'
> & {
  onChange?(value: number | null): void
}

export default function InputNumber({
  label,
  required,
  labelClassName,
  inputClassName,
  onChange,
  onFocus,
  onKeyDown,
  ...props
}: InputNumberProps) {
  return (
    <Input
      type="number"
      label={label ? <Label label={label} required={required} /> : undefined}
      labelClassName={cn('font-semibold text-gray-dark', labelClassName)}
      inputClassName={cn('[&_input::placeholder]:opacity-80', inputClassName)}
      placeholder=" "
      onChange={(e) => {
        onChange && onChange(e.target.value ? parseFloat(e.target.value) : null)
      }}
      {...props}
    />
  )
}
