import cn from '@/utils/class-names'
import { Text as RizText, TextProps as RizTextProps } from 'rizzui'

export type DefaultTextProps = {
  size?: '2xs' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '1.5xl' | '2xl' | '3xl'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gray'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right'
}

export type TextProps = Omit<RizTextProps, 'color' | 'fontWeight'> &
  DefaultTextProps & {
    variant?: 'default' | 'dark' | 'lighter'
  }

export const TextSizes = {
  '2xs': 'text-2xs',
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '1.5xl': 'text-1.5xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
}

export const TextColors = {
  gray: {
    default: 'text-gray',
    dark: 'text-gray-dark',
    lighter: 'text-gray-lighter',
  },
  primary: {
    default: 'text-primary',
    dark: 'text-primary-dark',
    lighter: 'text-primary-lighter',
  },
  secondary: {
    default: 'text-secondary',
    dark: 'text-secondary-dark',
    lighter: 'text-secondary-lighter',
  },
  success: {
    default: 'text-green',
    dark: 'text-green-dark',
    lighter: 'text-green-lighter',
  },
  warning: {
    default: 'text-orange',
    dark: 'text-orange-dark',
    lighter: 'text-orange-lighter',
  },
  danger: {
    default: 'text-red',
    dark: 'text-red-dark',
    lighter: 'text-red-lighter',
  },
}

export const TextWeights = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

export default function Text({
  size = 'base',
  weight = 'normal',
  variant,
  align,
  color,
  className,
  ...props
}: TextProps) {
  return (
    <RizText
      className={cn(
        TextSizes[size],
        TextWeights[weight],
        { [`text-${align}`]: !!align },
        color
          ? TextColors[color][variant ?? 'default']
          : variant
          ? TextColors['gray'][variant]
          : null,
        className
      )}
      {...props}
    />
  )
}
