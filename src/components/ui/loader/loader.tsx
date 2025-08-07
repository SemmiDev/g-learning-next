import cn from '@/utils/class-names'
import { Loader as RizLoader, LoaderTypes as RizLoaderTypes } from 'rizzui'

const loaderSizes = {
  '2xs': 'w-3',
  xs: 'w-4',
  sm: 'w-5',
  md: 'w-6',
  lg: 'w-7',
  xl: 'w-8',
  '2xl': 'w-9',
}

export type LoaderProps = Omit<RizLoaderTypes, 'size'> & {
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export default function Loader({
  height,
  size = 'md',
  className,
  ...props
}: LoaderProps) {
  return <RizLoader className={cn(loaderSizes[size], className)} {...props} />
}
