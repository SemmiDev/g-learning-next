import cn from '@/utils/class-names'
import { Switch as RizSwitch, SwitchProps as RizSwitchProps } from 'rizzui'

export type SwitchProps = RizSwitchProps & {}

export default function Switch({ labelClassName, ...props }: SwitchProps) {
  return (
    <RizSwitch
      labelClassName={cn('font-semibold text-gray-dark', labelClassName)}
      {...props}
    />
  )
}
