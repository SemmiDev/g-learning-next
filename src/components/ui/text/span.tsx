import cn from '@/utils/class-names'
import { forwardRef } from 'react'
import { TextColors, TextProps, TextSizes, TextWeights } from './text'

export default forwardRef<HTMLSpanElement, TextProps>(function TextSpan(
  {
    variant = 'default',
    size,
    weight,
    color,
    className,
    children,
    ...props
  }: TextProps,
  ref
) {
  return (
    <span
      ref={ref}
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
})
