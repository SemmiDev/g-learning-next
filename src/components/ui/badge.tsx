import cn from '@/utils/class-names'
import { PropsWithChildren } from 'react'
import { Badge as RizBadge, BadgeProps as RizBadgeProps } from 'rizzui'

const BadgeColorStyles = {
  solid: {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    danger: 'bg-danger text-white',
    info: 'bg-info text-white',
    gray: 'bg-gray text-white',
  },
  flat: {
    primary: 'bg-primary-lighter text-primary-dark',
    secondary: 'bg-secondary-lighter text-secondary-dark',
    success: 'bg-success-lighter text-success-dark',
    warning: 'bg-warning-lighter text-warning-dark',
    danger: 'bg-danger-lighter text-danger-dark',
    info: 'bg-info-lighter text-info-dark',
    gray: 'bg-gray-50 text-gray',
  },
  outline: {
    primary: 'text-primary-dark border-primary',
    secondary: 'text-secondary-dark border-secondary',
    success: 'text-success-dark border-success',
    warning: 'text-warning-dark border-warning',
    danger: 'text-danger-dark border-danger',
    info: 'text-info-dark border-info',
    gray: 'text-gray border-gray',
  },
}

export type BadgeProps = Omit<PropsWithChildren<RizBadgeProps>, 'color'> & {
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'gray'
}

export default function Badge({
  color = 'primary',
  variant = 'solid',
  className,
  ...props
}: BadgeProps) {
  return (
    <RizBadge
      variant={variant}
      className={cn(BadgeColorStyles[variant][color], className)}
      {...props}
    />
  )
}
