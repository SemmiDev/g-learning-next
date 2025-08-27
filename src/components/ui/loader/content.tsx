import cn from '@/utils/class-names'
import { forwardRef } from 'react'
import { LoaderTypes as RizLoaderTypes } from 'rizzui'
import Loader from './loader'

export type ContentLoaderProps = RizLoaderTypes & {
  height?: number | string
  loaderClassName?: string
}

export default forwardRef<HTMLDivElement, ContentLoaderProps>(
  function ContentLoader(
    {
      height,
      variant = 'spinner',
      color = 'primary',
      size = 'lg',
      loaderClassName,
      className,
      ...props
    }: ContentLoaderProps,
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn('flex justify-center items-center', className)}
        style={
          height
            ? { height: typeof height === 'number' ? `${height}px` : height }
            : undefined
        }
      >
        <Loader
          variant={variant}
          color={color}
          size={size}
          className={loaderClassName}
          {...props}
        />
      </div>
    )
  }
)
