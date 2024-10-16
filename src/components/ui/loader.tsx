import cn from '@/utils/class-names'
import { forwardRef } from 'react'
import { Loader as RizLoader, LoaderTypes as RizLoaderTypes } from 'rizzui'

export type LoaderProps = RizLoaderTypes & {
  height?: number
  containerClassName?: string
}

export default forwardRef<HTMLDivElement, LoaderProps>(function Loader(
  {
    height,
    variant = 'spinner',
    color = 'primary',
    size = 'lg',
    containerClassName,
    ...props
  }: LoaderProps,
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('flex justify-center items-center', containerClassName)}
      style={height ? { height: `${height}px` } : {}}
    >
      <RizLoader variant={variant} color={color} size={size} {...props} />
    </div>
  )
})
