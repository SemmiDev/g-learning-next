import cn from '@/utils/class-names'
import { TextColors, TextProps, TextSizes, TextWeights } from './text'

export default function TextSpan({
  variant = 'default',
  size,
  weight,
  color,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <span
      className={cn(
        size ? TextSizes[size] : null,
        weight ? TextWeights[weight] : null,
        color ? TextColors[color][variant] : null,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
