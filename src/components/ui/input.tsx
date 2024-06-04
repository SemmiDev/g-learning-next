import cn from '@/utils/class-names'
import { Input as RizInput, InputProps as RizInputProps } from 'rizzui'

export type InputProps = RizInputProps & {}

export default function Input({
  labelClassName,
  inputClassName,
  ...props
}: InputProps) {
  return (
    <RizInput
      labelClassName={cn('font-semibold text-gray-dark', labelClassName)}
      inputClassName={cn('[&_input::placeholder]:opacity-80', inputClassName)}
      placeholder=" "
      {...props}
    />
  )
}
