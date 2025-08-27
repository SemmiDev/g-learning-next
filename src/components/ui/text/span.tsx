import cn from '@/utils/class-names'
import { forwardRef } from 'react'
import { textColors, TextProps, textSizes, textWeights } from './text'

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
        size ? textSizes[size] : null,
        weight ? textWeights[weight] : null,
        color ? textColors[color][variant] : null,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})
