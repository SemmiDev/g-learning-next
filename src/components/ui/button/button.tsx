import cn from '@/utils/class-names'
import { Without } from '@/utils/without-type'
import { Button as RizButton, ButtonProps as RizButtonProps } from 'rizzui'
import { TextWeights } from '../text/text'

export type ButtonColorProp =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export type ButtonVariantProp =
  | 'solid'
  | 'flat'
  | 'outline'
  | 'text'
  | 'text-colorful'
  | 'outline-colorful'

export type ButtonProps = Without<RizButtonProps, 'color' | 'variant'> & {
  variant?: ButtonVariantProp
  color?: ButtonColorProp
  fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
}

const ButtonColors = {
  text: {
    primary: 'hover:text-primary',
    secondary: 'hover:text-secondary',
    success: 'hover:text-green',
    warning: 'hover:text-orange',
    danger: 'hover:text-red',
  },
  'text-colorful': {
    primary: 'text-primary hover:text-primary-dark',
    secondary: 'text-secondary hover:text-secondary-dark',
    success: 'text-green hover:text-green-dark',
    warning: 'text-orange hover:text-orange-dark',
    danger: 'text-red hover:text-red-dark',
  },
  flat: {
    primary: 'hover:bg-primary-lighter hover:text-primary-dark',
    secondary: 'hover:bg-secondary-lighter hover:text-secondary-dark',
    success: 'hover:bg-green-lighter hover:text-green-dark',
    warning: 'hover:bg-orange-lighter hover:text-orange-dark',
    danger: 'hover:bg-red-lighter hover:text-red-dark',
  },
  outline: {
    primary: 'hover:text-primary hover:border-primary',
    secondary: 'hover:text-secondary hover:border-secondary',
    success: 'hover:text-green hover:border-green',
    warning: 'hover:text-orange hover:border-orange',
    danger: 'hover:text-red hover:border-red',
  },
  'outline-colorful': {
    primary:
      'text-primary border-primary hover:text-primary-dark hover:border-primary-dark',
    secondary:
      'text-secondary border-secondary hover:text-secondary-dark hover:border-secondary-dark',
    success:
      'text-green border-green hover:text-green-dark hover:border-green-dark',
    warning:
      'text-orange border-orange hover:text-orange-dark hover:border-orange-dark',
    danger: 'text-red border-red hover:text-red-dark hover:border-red-dark',
  },
  solid: {
    primary: 'bg-primary hover:bg-primary-dark',
    secondary: 'bg-secondary hover:bg-secondary-dark',
    success: 'bg-green hover:bg-green-dark',
    warning: 'bg-orange hover:bg-orange-dark',
    danger: 'bg-red hover:bg-red-dark',
  },
}

type RizVariant = 'solid' | 'flat' | 'outline' | 'text' | undefined

export default function Button({
  color = 'primary',
  variant = 'solid',
  fontWeight,
  className,
  ...props
}: ButtonProps) {
  let rizVariant: RizVariant
  switch (variant) {
    case 'solid':
      rizVariant = 'solid'
      break
    case 'flat':
      rizVariant = 'flat'
      break
    case 'outline':
    case 'outline-colorful':
      rizVariant = 'outline'
      break
    case 'text':
    case 'text-colorful':
      rizVariant = 'text'
      break
    default:
      break
  }
  return (
    <RizButton
      className={cn(
        fontWeight ? TextWeights[fontWeight] : null,
        !props.disabled ? ButtonColors[variant][color] : null,
        className
      )}
      variant={rizVariant}
      {...props}
    />
  )
}
