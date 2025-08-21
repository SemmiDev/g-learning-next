import cn from '@/utils/class-names'
import { ReactNode } from 'react'
import './shimmer.css'

const shimmerRoundeds = {
  sm: 'rounded-sm',
  base: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
  none: 'rounded-none',
}

export type ShimmerProps = {
  rounded?: keyof typeof shimmerRoundeds
  children?: ReactNode
  className?: string
}

export default function Shimmer({
  rounded = 'md',
  children,
  className,
}: ShimmerProps) {
  return (
    <div className={cn('shimmer', shimmerRoundeds[rounded], className)}>
      {children}
    </div>
  )
}
