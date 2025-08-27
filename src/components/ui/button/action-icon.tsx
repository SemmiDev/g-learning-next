import cn from '@/utils/class-names'
import { forwardRef } from 'react'
import {
  ActionIcon as RizActionIcon,
  type ActionIconProps as RizActionIconProps,
} from 'rizzui'
import { DefaultTextProps, textWeights } from '../text/text'
import {
  buttonColorStyles,
  ButtonColorType,
  ButtonVariantType,
  getRizVariant,
} from './button'

export type ActionIconProps = Omit<RizActionIconProps, 'color' | 'variant'> & {
  variant?: ButtonVariantType
  color?: ButtonColorType
  fontWeight?: DefaultTextProps['weight']
}

export default forwardRef<HTMLButtonElement, ActionIconProps>(
  function ActionIcon(
    {
      color = 'primary',
      variant = 'solid',
      fontWeight,
      className,
      ...props
    }: ActionIconProps,
    ref
  ) {
    return (
      <RizActionIcon
        ref={ref}
        className={cn(
          'shrink-0',
          !props.disabled ? buttonColorStyles[variant][color] : null,
          fontWeight ? textWeights[fontWeight] : null,
          className
        )}
        variant={getRizVariant(variant)}
        {...props}
      />
    )
  }
)
