import cn from '@/utils/class-names'
import {
  ActionIcon as RizActionIcon,
  type ActionIconProps as RizActionIconProps,
} from 'rizzui'
import { DefaultTextProps, TextWeights } from '../text/text'
import {
  ButtonColors,
  ButtonColorStyles,
  ButtonVariants,
  getRizVariant,
} from './button'

export type ActionIconProps = Omit<RizActionIconProps, 'color' | 'variant'> & {
  variant?: ButtonVariants
  color?: ButtonColors
  fontWeight?: DefaultTextProps['weight']
}

export default function ActionIcon({
  color = 'primary',
  variant = 'solid',
  fontWeight,
  className,
  ...props
}: ActionIconProps) {
  return (
    <RizActionIcon
      className={cn(
        !props.disabled ? ButtonColorStyles[variant][color] : null,
        fontWeight ? TextWeights[fontWeight] : null,
        className
      )}
      variant={getRizVariant(variant)}
      {...props}
    />
  )
}
