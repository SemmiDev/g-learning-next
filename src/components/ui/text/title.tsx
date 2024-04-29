import cn from '@/utils/class-names'
import { Title as RizTitle, TitleProps as RizTitleProps } from 'rizzui'
import { DefaultTextProps, TextColors, TextSizes, TextWeights } from './text'
import { Without } from '@/utils/without-type'

type TextProps = Without<RizTitleProps, 'color' | 'fontWeight'> &
  DefaultTextProps & {
    variant?: 'default' | 'dark' | 'lighter'
  }

export default function Title({
  color = 'gray',
  variant = 'dark',
  weight = 'bold',
  size,
  className,
  ...props
}: TextProps) {
  return (
    <RizTitle
      className={cn(
        TextColors[color][variant],
        TextWeights[weight],
        size ? TextSizes[size] : null,
        className
      )}
      {...props}
    />
  )
}
