import cn from '@/utils/class-names'
import { ReactNode } from 'react'
import './shimmer.css'

export type ShimmerProps = {
  rounded?: 'normal' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  children?: ReactNode
  className?: string
}

export default function Shimmer({
  rounded = 'md',
  children,
  className,
}: ShimmerProps) {
  return (
    <div
      className={cn(
        'shimmer',
        rounded == 'normal' ? 'rounded' : `rounded-${rounded}`,
        className
      )}
    >
      {children}
    </div>
  )
}
