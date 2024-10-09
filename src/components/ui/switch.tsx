import cn from '@/utils/class-names'
import { forwardRef } from 'react'
import { Switch as RizSwitch, SwitchProps as RizSwitchProps } from 'rizzui'

export type SwitchProps = RizSwitchProps & {}

export default forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { labelClassName, ...props }: SwitchProps,
  ref
) {
  return (
    <RizSwitch
      ref={ref}
      labelClassName={cn('font-semibold text-gray-dark', labelClassName)}
      {...props}
    />
  )
})
