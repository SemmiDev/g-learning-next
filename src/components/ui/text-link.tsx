import Link, { LinkProps } from 'next/link'
import { DefaultTextProps, TextSizes, TextWeights } from './text'
import cn from '@/utils/class-names'
import { ReactNode } from 'react'
import { Without } from '@/utils/without-type'

type TextLinkProps = LinkProps &
  Without<DefaultTextProps, 'color'> & {
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
  }

const TextLinkColors = {
  default: 'text-gray hover:text-primary',
  primary: 'text-primary hover:text-primary-dark',
  secondary: 'text-secondary hover:text-secondary-dark',
  success: 'text-green hover:text-green-dark',
  warning: 'text-yellow hover:text-yellow-dark',
  danger: 'text-red hover:text-red-dark',
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
