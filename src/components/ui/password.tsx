import cn from '@/utils/class-names'
import {
  Password as RizPassword,
  PasswordProps as RizPasswordProps,
} from 'rizzui'
import Label from './label'

export type PasswordProps = RizPasswordProps & {}

export default function Password({
  label,
  required,
  labelClassName,
  inputClassName,
  ...props
}: PasswordProps) {
  return (
    <RizPassword
      label={<Label label={label} required={required} />}
      labelClassName={cn('font-semibold text-gray-dark', labelClassName)}
      inputClassName={cn('[&_input::placeholder]:opacity-80', inputClassName)}
      placeholder=" "
      {...props}
    />
  )
}
