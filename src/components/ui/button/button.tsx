import cn from '@/utils/class-names'
import { forwardRef } from 'react'
import { Button as RizButton, type ButtonProps as RizButtonProps } from 'rizzui'
import { DefaultTextProps, textWeights } from '../text/text'

export type ButtonColorType =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'gray'

export const buttonColorStyles: Record<
  string,
  Record<ButtonColorType, string>
> = {
  solid: {
    primary:
      'bg-primary hover:bg-primary-dark focus-visible:ring-primary-lighter',
    secondary:
      'bg-secondary hover:bg-secondary-dark focus-visible:ring-secondary-lighter',
    info: 'bg-info hover:bg-info-dark focus-visible:ring-info-lighter',
    success:
      'bg-success hover:bg-success-dark focus-visible:ring-success-lighter',
    warning:
      'bg-warning hover:bg-warning-dark focus-visible:ring-warning-lighter',
    danger: 'bg-danger hover:bg-danger-dark focus-visible:ring-danger-lighter',
    gray: 'bg-gray hover:bg-gray-dark focus-visible:ring-muted',
  },
  flat: {
    primary:
      'hover:bg-primary-lighter hover:text-primary-dark focus-visible:ring-primary-lighter',
    secondary:
      'hover:bg-secondary-lighter hover:text-secondary-dark focus-visible:ring-secondary-lighter',
    info: 'hover:bg-info-lighter hover:text-info-dark focus-visible:ring-info-lighter',
    success:
      'hover:bg-success-lighter hover:text-success-dark focus-visible:ring-success-lighter',
    warning:
      'hover:bg-warning-lighter hover:text-warning-dark focus-visible:ring-warning-lighter',
    danger:
      'hover:bg-danger-lighter hover:text-danger-dark focus-visible:ring-danger-lighter',
    gray: 'hover:bg-gray-lighter hover:text-gray-dark focus-visible:ring-muted',
  },
  'flat-colorful': {
    primary:
      'bg-gray-50/100 text-primary hover:bg-primary-lighter hover:text-primary-dark focus-visible:ring-primary-lighter',
    secondary:
      'bg-gray-50/100 text-secondary hover:bg-secondary-lighter hover:text-secondary-dark focus-visible:ring-secondary-lighter',
    info: 'bg-gray-50/100 text-info hover:bg-info-lighter hover:text-info-dark focus-visible:ring-info-lighter',
    success:
      'bg-gray-50/100 text-success hover:bg-success-lighter hover:text-success-dark focus-visible:ring-success-lighter',
    warning:
      'bg-gray-50/100 text-warning hover:bg-warning-lighter hover:text-warning-dark focus-visible:ring-warning-lighter',
    danger:
      'bg-gray-50/100 text-danger hover:bg-danger-lighter hover:text-danger-dark focus-visible:ring-danger-lighter',
    gray: 'bg-gray-50/100 text-gray hover:bg-gray-lighter hover:text-gray-dark focus-visible:ring-muted',
  },
  outline: {
    primary:
      'hover:text-primary hover:border-primary focus-visible:ring-primary-lighter',
    secondary:
      'hover:text-secondary hover:border-secondary focus-visible:ring-secondary-lighter',
    info: 'hover:text-info hover:border-info focus-visible:ring-info-lighter',
    success:
      'hover:text-success hover:border-success focus-visible:ring-success-lighter',
    warning:
      'hover:text-warning hover:border-warning focus-visible:ring-warning-lighter',
    danger:
      'hover:text-danger hover:border-danger focus-visible:ring-danger-lighter',
    gray: 'hover:text-gray hover:border-gray focus-visible:ring-muted',
  },
  'outline-colorful': {
    primary:
      'text-primary border-primary hover:text-primary-dark hover:border-primary-dark focus-visible:ring-primary-lighter',
    secondary:
      'text-secondary border-secondary hover:text-secondary-dark hover:border-secondary-dark focus-visible:ring-secondary-lighter',
    info: 'text-info border-info hover:text-info-dark hover:border-info-dark focus-visible:ring-info-lighter',
    success:
      'text-success border-success hover:text-success-dark hover:border-success-dark focus-visible:ring-success-lighter',
    warning:
      'text-warning border-warning hover:text-warning-dark hover:border-warning-dark focus-visible:ring-warning-lighter',
    danger:
      'text-danger border-danger hover:text-danger-dark hover:border-danger-dark focus-visible:ring-danger-lighter',
    gray: 'text-gray border-gray hover:text-gray-dark hover:border-gray-dark focus-visible:ring-muted',
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
    gray: 'border-transparent hover:text-gray hover:border-gray focus-visible:ring-muted',
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
    gray: 'text-gray border-transparent hover:text-gray hover:border-gray focus-visible:ring-muted',
  },
  text: {
    primary: 'hover:text-primary focus-visible:ring-primary-lighter',
    secondary: 'hover:text-secondary focus-visible:ring-secondary-lighter',
    info: 'hover:text-info focus-visible:ring-info-lighter',
    success: 'hover:text-success focus-visible:ring-success-lighter',
    warning: 'hover:text-warning focus-visible:ring-warning-lighter',
    danger: 'hover:text-danger focus-visible:ring-danger-lighter',
    gray: 'hover:text-gray focus-visible:ring-muted',
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
    gray: 'text-gray hover:text-gray-dark focus-visible:ring-muted',
  },
}

const buttonSizeStyles = {
  sm: 'min-h-8',
  md: 'min-h-10',
  lg: 'min-h-12',
  xl: 'min-h-14',
}

export const getRizVariant = (
  variant: ButtonVariantType,
  disabled: boolean = false
): RizButtonProps['variant'] => {
  if (disabled) return 'solid'

  switch (variant) {
    case 'solid':
      return 'solid'
    case 'flat':
    case 'flat-colorful':
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

export type ButtonVariantType = keyof typeof buttonColorStyles

export type ButtonProps = Omit<RizButtonProps, 'color' | 'variant'> & {
  variant?: ButtonVariantType
  color?: ButtonColorType
  fontWeight?: DefaultTextProps['weight']
}

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    color = 'primary',
    variant = 'solid',
    size = 'md',
    fontWeight,
    className,
    disabled,
    ...props
  }: ButtonProps,
  ref
) {
  return (
    <RizButton
      ref={ref}
      className={cn(
        'h-fit',
        !disabled ? buttonColorStyles[variant][color] : null,
        buttonSizeStyles[size],
        fontWeight ? textWeights[fontWeight] : null,
        className
      )}
      size={size}
      variant={getRizVariant(variant, disabled)}
      disabled={disabled}
      {...props}
    />
  )
})
