import cn from '@/utils/class-names'
import { Title as RizTitle, TitleProps as RizTitleProps } from 'rizzui'
import { DefaultTextProps, textColors, textSizes, textWeights } from './text'

type TextProps = Omit<RizTitleProps, 'color' | 'fontWeight'> &
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
        textColors[color][variant],
        textWeights[weight],
        size ? textSizes[size] : null,
        className
      )}
      {...props}
    />
  )
}
