import cn from '@/utils/class-names'
import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'
import { DefaultTextProps, TextSizes, TextWeights } from './text'

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

const TextLinkColors = {
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
        TextLinkColors[color],
        TextWeights[weight],
        size ? TextSizes[size] : null,
        className
      )}
      {...props}
    />
  )
}
