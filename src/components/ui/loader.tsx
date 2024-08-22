import { Loader as RizLoader, LoaderTypes as RizLoaderTypes } from 'rizzui'

export type LoaderProps = RizLoaderTypes & {
  height?: number
}

export default function Loader({
  height,
  variant = 'spinner',
  color = 'primary',
  size = 'lg',
  ...props
}: LoaderProps) {
  return (
    <div
      className="flex justify-center items-center"
      style={height ? { height: `${height}px` } : {}}
    >
      <RizLoader variant={variant} color={color} size={size} {...props} />
    </div>
  )
}
