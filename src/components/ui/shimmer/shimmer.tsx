import cn from '@/utils/class-names'
import './shimmer.css'

export type ShimmerProps = {
  rounded?: 'normal' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function Shimmer({ rounded = 'md', className }: ShimmerProps) {
  return (
    <div
      className={cn(
        'shimmer',
        rounded == 'normal' ? 'rounded' : `rounded-${rounded}`,
        className
      )}
    ></div>
  )
}
