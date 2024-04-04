import cn from '@/utils/class-names'
import { Input as RizInput, InputProps } from 'rizzui'

export default function Input({ labelClassName, ...props }: InputProps) {
  return (
    <RizInput
      labelClassName={cn('font-semibold text-gray-dark', labelClassName)}
      {...props}
    />
  )
}
