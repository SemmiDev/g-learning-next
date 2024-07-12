import cn from '@/utils/class-names'
import { Button as RizButton, type ButtonProps as RizButtonProps } from 'rizzui'
import { DefaultTextProps, TextWeights } from '../text/text'
import { forwardRef } from 'react'

export type ButtonColors =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'gray'

export type ButtonVariants =
  | 'solid'
  | 'flat'
  | 'outline'
  | 'text'
  | 'text-colorful'
  | 'outline-colorful'
  | 'outline-hover'
  | 'outline-hover-colorful'

export type ButtonProps = Omit<RizButtonProps, 'color' | 'variant'> & {
  variant?: ButtonVariants
  color?: ButtonColors
  fontWeight?: DefaultTextProps['weight']
}

export const ButtonColorStyles = {
  solid: {
    primary: 'bg-primary hover:bg-primary-dark',
    secondary: 'bg-secondary hover:bg-secondary-dark',
    info: 'bg-info hover:bg-info-dark',
    success: 'bg-success hover:bg-success-dark',
    warning: 'bg-warning hover:bg-warning-dark',
    danger: 'bg-danger hover:bg-danger-dark',
    gray: 'bg-gray hover:bg-gray-dark',
  },
  flat: {
    primary:
      'hover:bg-primary-lighter hover:text-primary-dark focus-visible:ring-muted',
    secondary:
      'hover:bg-secondary-lighter hover:text-secondary-dark focus-visible:ring-muted',
    info: 'hover:bg-info-lighter hover:text-info-dark focus-visible:ring-muted',
    success:
      'hover:bg-success-lighter hover:text-success-dark focus-visible:ring-muted',
    warning:
      'hover:bg-warning-lighter hover:text-warning-dark focus-visible:ring-muted',
    danger:
      'hover:bg-danger-lighter hover:text-danger-dark focus-visible:ring-muted',
    gray: 'hover:bg-gray-lighter hover:text-gray-dark focus-visible:ring-muted',
  },
  outline: {
    primary: 'hover:text-primary hover:border-primary',
    secondary: 'hover:text-secondary hover:border-secondary',
    info: 'hover:text-info hover:border-info',
    success: 'hover:text-success hover:border-success',
    warning: 'hover:text-warning hover:border-warning',
    danger: 'hover:text-danger hover:border-danger',
    gray: 'hover:text-gray hover:border-gray',
  },
  'outline-colorful': {
    primary:
      'text-primary border-primary hover:text-primary-dark hover:border-primary-dark',
    secondary:
      'text-secondary border-secondary hover:text-secondary-dark hover:border-secondary-dark',
    info: 'text-info border-info hover:text-info-dark hover:border-info-dark',
    success:
      'text-success border-success hover:text-success-dark hover:border-success-dark',
    warning:
      'text-warning border-warning hover:text-warning-dark hover:border-warning-dark',
    danger:
      'text-danger border-danger hover:text-danger-dark hover:border-danger-dark',
    gray: 'text-gray border-gray hover:text-gray-dark hover:border-gray-dark',
  },
  'outline-hover': {
    primary:
      'border-transparent hover:text-primary hover:border-primary focus-visible:ring-primary-lighter',
    secondary:
      'border-transparent hover:text-secondary hover:border-secondary focus-visible:ring-secondary-lighter',
    info: 'border-transparent hover:text-info hover:border-info focus-visible:ring-info-lighter',
    success:
      'border-transparent hover:text-success hover:border-success focus-visible:ring-success-lighter',
    warning:
      'border-transparent hover:text-warning hover:border-warning focus-visible:ring-warning-lighter',
    danger:
      'border-transparent hover:text-danger hover:border-danger focus-visible:ring-danger-lighter',
    gray: 'border-transparent hover:text-gray hover:border-gray focus-visible:ring-gray-lighter',
  },
  'outline-hover-colorful': {
    primary:
      'text-primary border-transparent hover:text-primary hover:border-primary focus-visible:ring-primary-lighter',
    secondary:
      'text-secondary border-transparent hover:text-secondary hover:border-secondary focus-visible:ring-secondary-lighter',
    info: 'text-info border-transparent hover:text-info hover:border-info focus-visible:ring-info-lighter',
    success:
      'text-success border-transparent hover:text-success hover:border-success focus-visible:ring-success-lighter',
    warning:
      'text-warning border-transparent hover:text-warning hover:border-warning focus-visible:ring-warning-lighter',
    danger:
      'text-danger border-transparent hover:text-danger hover:border-danger focus-visible:ring-danger-lighter',
    gray: 'text-gray border-transparent hover:text-gray hover:border-gray focus-visible:ring-gray-lighter',
  },
  text: {
    primary: 'hover:text-primary focus-visible:ring-primary-lighter',
    secondary: 'hover:text-secondary focus-visible:ring-secondary-lighter',
    info: 'hover:text-info focus-visible:ring-info-lighter',
    success: 'hover:text-success focus-visible:ring-success-lighter',
    warning: 'hover:text-warning focus-visible:ring-warning-lighter',
    danger: 'hover:text-danger focus-visible:ring-danger-lighter',
    gray: 'hover:text-gray focus-visible:ring-gray-lighter',
  },
  'text-colorful': {
    primary:
      'text-primary hover:text-primary-dark focus-visible:ring-primary-lighter',
    secondary:
      'text-secondary hover:text-secondary-dark focus-visible:ring-secondary-lighter',
    info: 'text-info hover:text-info-dark focus-visible:ring-info-lighter',
    success:
      'text-success hover:text-success-dark focus-visible:ring-success-lighter',
    warning:
      'text-warning hover:text-warning-dark focus-visible:ring-warning-lighter',
    danger:
      'text-danger hover:text-danger-dark focus-visible:ring-danger-lighter',
    gray: 'text-gray hover:text-gray-dark focus-visible:ring-gray-lighter',
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

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    color = 'primary',
    variant = 'solid',
    fontWeight,
    className,
    ...props
  }: ButtonProps,
  ref
) {
  return (
    <RizButton
      ref={ref}
      className={cn(
        !props.disabled ? ButtonColorStyles[variant][color] : null,
        fontWeight ? TextWeights[fontWeight] : null,
        className
      )}
      variant={getRizVariant(variant)}
      {...props}
    />
  )
})
