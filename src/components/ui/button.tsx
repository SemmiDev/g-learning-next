import cn from '@/utils/class-names'
import { Without } from '@/utils/without-type'
import { Button as RizButton, ButtonProps as RizButtonProps } from 'rizzui'

type ButtonProps = Without<RizButtonProps, 'color'> & {
  classNames?: string
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary'
}

const ButtonColors = {
  text: {
    primary: 'hover:text-primary',
    success: 'hover:text-green',
    warning: 'hover:text-yellow',
    danger: 'hover:text-red',
    secondary: 'hover:text-secondary',
  },
  flat: {
    primary: 'hover:bg-primary-lighter hover:text-primary-dark',
    success: 'hover:bg-green-lighter hover:text-green-dark',
    warning: 'hover:bg-yellow-lighter hover:text-yellow-dark',
    danger: 'hover:bg-red-lighter hover:text-red-dark',
    secondary: 'hover:bg-secondary-lighter hover:text-secondary-dark',
  },
  outline: {
    primary: 'hover:text-primary hover:border-primary',
    success: 'hover:text-green hover:border-green',
    warning: 'hover:text-yellow hover:border-yellow',
    danger: 'hover:text-red hover:border-red',
    secondary: 'hover:text-secondary hover:border-secondary',
  },
  solid: {
    primary: 'bg-primary hover:bg-primary-dark',
    success: 'bg-green hover:bg-green-dark',
    warning: 'bg-yellow hover:bg-yellow-dark',
    danger: 'bg-red hover:bg-red-dark',
    secondary: 'bg-secondary hover:bg-secondary-dark',
  },
}

export default function Button({ classNames, color, ...props }: ButtonProps) {
  return (
    <RizButton
      className={cn(ButtonColors[props.variant ?? 'solid'][color ?? 'primary'])}
      {...props}
    />
  )
}
