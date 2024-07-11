import cn from '@/utils/class-names'
import {
  Password as RizPassword,
  PasswordProps as RizPasswordProps,
} from 'rizzui'

export type PasswordProps = RizPasswordProps & {}

export default function Password({
  labelClassName,
  inputClassName,
  ...props
}: PasswordProps) {
  return (
    <RizPassword
      labelClassName={cn('font-semibold text-gray-dark', labelClassName)}
      inputClassName={cn('[&_input::placeholder]:opacity-80', inputClassName)}
      placeholder=" "
      {...props}
    />
  )
}
