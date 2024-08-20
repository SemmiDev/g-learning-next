import cn from '@/utils/class-names'
import { Input as RizInput, InputProps as RizInputProps } from 'rizzui'
import Label from '../label'

export type InputProps = RizInputProps & {
  phoneNumber?: boolean
}

export default function Input({
  label,
  required,
  labelClassName,
  inputClassName,
  onFocus,
  phoneNumber,
  onKeyDown,
  ...props
}: InputProps) {
  return (
    <RizInput
      label={<Label label={label} required={required} />}
      labelClassName={cn('font-semibold text-gray-dark', labelClassName)}
      inputClassName={cn('[&_input::placeholder]:opacity-80', inputClassName)}
      placeholder=" "
      onFocus={(e) => {
        onFocus && onFocus(e)

        if (props.type === 'number') {
          e.target.addEventListener('wheel', (e) => e.preventDefault(), {
            passive: false,
          })
        }
      }}
      // disable arrowup and arrowdown (step for type number), comma and point if phoneNumber
      onKeyDown={
        props.type === 'number' && phoneNumber
          ? (e) => {
              if (['ArrowUp', 'ArrowDown', ',', '.'].includes(e.key)) {
                e.preventDefault()
              }
            }
          : onKeyDown
      }
      {...props}
    />
  )
}
