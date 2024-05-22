import cn from '@/utils/class-names'
import { Without } from '@/utils/without-type'
import { Button as RizButton, type ButtonProps as RizButtonProps } from 'rizzui'
import { DefaultTextProps, TextWeights } from '../text/text'

export type ButtonColors =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export type ButtonVariants =
  | 'solid'
  | 'flat'
  | 'outline'
  | 'text'
  | 'text-colorful'
  | 'outline-colorful'
  | 'outline-hover'
  | 'outline-hover-colorful'

export type ButtonProps = Without<RizButtonProps, 'color' | 'variant'> & {
  variant?: ButtonVariants
  color?: ButtonColors
  fontWeight?: DefaultTextProps['weight']
}

export const ButtonColorStyles = {
  solid: {
    primary: 'bg-primary hover:bg-primary-dark',
    secondary: 'bg-secondary hover:bg-secondary-dark',
    success: 'bg-green hover:bg-green-dark',
    warning: 'bg-orange hover:bg-orange-dark',
    danger: 'bg-red hover:bg-red-dark',
  },
  flat: {
    primary:
      'hover:bg-primary-lighter hover:text-primary-dark focus-visible:ring-muted',
    secondary:
      'hover:bg-secondary-lighter hover:text-secondary-dark focus-visible:ring-muted',
    success:
      'hover:bg-green-lighter hover:text-green-dark focus-visible:ring-muted',
    warning:
      'hover:bg-orange-lighter hover:text-orange-dark focus-visible:ring-muted',
    danger: 'hover:bg-red-lighter hover:text-red-dark focus-visible:ring-muted',
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
  'outline-hover': {
    primary:
      'border-transparent hover:text-primary hover:border-primary focus-visible:ring-primary-lighter',
    secondary:
      'border-transparent hover:text-secondary hover:border-secondary focus-visible:ring-secondary-lighter',
    success:
      'border-transparent hover:text-green hover:border-green focus-visible:ring-green-lighter',
    warning:
      'border-transparent hover:text-orange hover:border-orange focus-visible:ring-orange-lighter',
    danger:
      'border-transparent hover:text-red hover:border-red focus-visible:ring-red-lighter',
  },
  'outline-hover-colorful': {
    primary:
      'text-primary border-transparent hover:text-primary hover:border-primary focus-visible:ring-primary-lighter',
    secondary:
      'text-secondary border-transparent hover:text-secondary hover:border-secondary focus-visible:ring-secondary-lighter',
    success:
      'text-green border-transparent hover:text-green hover:border-green focus-visible:ring-green-lighter',
    warning:
      'text-orange border-transparent hover:text-orange hover:border-orange focus-visible:ring-orange-lighter',
    danger:
      'text-red border-transparent hover:text-red hover:border-red focus-visible:ring-red-lighter',
  },
  text: {
    primary: 'hover:text-primary focus-visible:ring-primary-lighter',
    secondary: 'hover:text-secondary focus-visible:ring-secondary-lighter',
    success: 'hover:text-green focus-visible:ring-green-lighter',
    warning: 'hover:text-orange focus-visible:ring-orange-lighter',
    danger: 'hover:text-red focus-visible:ring-red-lighter',
  },
  'text-colorful': {
    primary:
      'text-primary hover:text-primary-dark focus-visible:ring-primary-lighter',
    secondary:
      'text-secondary hover:text-secondary-dark focus-visible:ring-secondary-lighter',
    success:
      'text-green hover:text-green-dark focus-visible:ring-green-lighter',
    warning:
      'text-orange hover:text-orange-dark focus-visible:ring-orange-lighter',
    danger: 'text-red hover:text-red-dark focus-visible:ring-red-lighter',
  },
}

export const getRizVariant = (
  variant: ButtonVariants
): RizButtonProps['variant'] => {
  switch (variant) {
    case 'solid':
      return 'solid'
    case 'flat':
      return 'flat'
    case 'outline':
    case 'outline-colorful':
    case 'outline-hover':
    case 'outline-hover-colorful':
      return 'outline'
    case 'text':
    case 'text-colorful':
      return 'text'
  }
}

export default function Button({
  color = 'primary',
  variant = 'solid',
  fontWeight,
  className,
  ...props
}: ButtonProps) {
  return (
    <RizButton
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
