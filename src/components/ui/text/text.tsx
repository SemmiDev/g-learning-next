import cn from '@/utils/class-names'
import { Text as RizText, TextProps as RizTextProps } from 'rizzui'

export const textSizes = {
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

export const textColors = {
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
    default: 'text-success',
    dark: 'text-success-dark',
    lighter: 'text-success-lighter',
  },
  warning: {
    default: 'text-warning',
    dark: 'text-warning-dark',
    lighter: 'text-warning-lighter',
  },
  danger: {
    default: 'text-danger',
    dark: 'text-danger-dark',
    lighter: 'text-danger-lighter',
  },
}

export const textWeights = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
}

export const textAligns = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export type DefaultTextProps = {
  size?: keyof typeof textSizes
  color?: keyof typeof textColors
  weight?: keyof typeof textWeights
  align?: keyof typeof textAligns
}

export type TextProps = Omit<RizTextProps, 'color' | 'fontWeight'> &
  DefaultTextProps & {
    variant?: 'default' | 'dark' | 'lighter'
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
        textSizes[size],
        textWeights[weight],
        align ? textAligns[align] : null,
        color
          ? textColors[color][variant ?? 'default']
          : variant
          ? textColors['gray'][variant]
          : null,
        className
      )}
      {...props}
    />
  )
}
