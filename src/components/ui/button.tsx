import cn from '@/utils/class-names'
import { Without } from '@/utils/without-type'
import { Button as RizButton, ButtonProps as RizButtonProps } from 'rizzui'

type ButtonProps = Without<RizButtonProps, 'color'> & {
  classNames?: string
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

const ButtonColors = {
  text: {
    primary: 'hover:text-primary',
    secondary: 'hover:text-secondary',
    success: 'hover:text-green',
    warning: 'hover:text-orange',
    danger: 'hover:text-red',
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
  solid: {
    primary: 'bg-primary hover:bg-primary-dark',
    secondary: 'bg-secondary hover:bg-secondary-dark',
    success: 'bg-green hover:bg-green-dark',
    warning: 'bg-orange hover:bg-orange-dark',
    danger: 'bg-red hover:bg-red-dark',
  },
}

export default function Button({
  classNames,
  color,
  className,
  ...props
}: ButtonProps) {
  return (
    <RizButton
      className={cn(
        !props.disabled
          ? ButtonColors[props.variant ?? 'solid'][color ?? 'primary']
          : null,
        className
      )}
      {...props}
    />
  )
}
