import cn from '@/utils/class-names'
import {
  Checkbox as RizCheckbox,
  CheckboxProps as RizCheckboxProps,
} from 'rizzui'

export type CheckboxProps = RizCheckboxProps

export default function Checkbox({
  className,
  inputClassName,
  ...props
}: CheckboxProps) {
  return (
    <RizCheckbox
      className={cn('[&_.rizzui-radio-field]:cursor-pointer', className)}
      inputClassName={cn(
        'checked:disabled:!bg-muted/70 checked:disabled:!border-muted',
        inputClassName
      )}
      {...props}
    />
  )
}
