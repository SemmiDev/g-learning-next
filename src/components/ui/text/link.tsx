import cn from '@/utils/class-names'
import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'
import { DefaultTextProps, textSizes, textWeights } from './text'

type TextLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps &
  Omit<DefaultTextProps, 'color'> & {
    color?:
      | 'default'
      | 'primary'
      | 'secondary'
      | 'success'
      | 'warning'
      | 'danger'
      | 'gray'
    className?: string
    children?: ReactNode
  } & React.RefAttributes<HTMLAnchorElement>

const textLinkColors = {
  default: 'text-gray hover:text-primary',
  primary: 'text-primary hover:text-primary-dark',
  secondary: 'text-secondary hover:text-secondary-dark',
  success: 'text-success hover:text-success-dark',
  warning: 'text-warning hover:text-warning-dark',
  danger: 'text-danger hover:text-danger-dark',
  gray: 'text-gray hover:text-gray-dark',
}

export default function TextLink({
  color = 'default',
  weight = 'normal',
  size,
  className,
  ...props
}: TextLinkProps) {
  return (
    <Link
      className={cn(
        'transition-colors',
        textLinkColors[color],
        textWeights[weight],
        size ? textSizes[size] : null,
        className
      )}
      {...props}
    />
  )
}
