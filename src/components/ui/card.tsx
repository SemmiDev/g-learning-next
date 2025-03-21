import cn from '@/utils/class-names'
import { forwardRef } from 'react'

export type CardProps = {
  shadow?: 'normal' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'normal' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  children?: React.ReactNode
}

export default forwardRef<HTMLDivElement, CardProps>(function Card(
  { shadow = 'normal', rounded = 'md', className, children }: CardProps,
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-white border border-muted rounded-md overflow-clip p-2',
        shadow == 'normal' ? 'shadow' : `shadow-${shadow}`,
        rounded == 'normal' ? 'rounded' : `rounded-${rounded}`,
        className
      )}
    >
      {children}
    </div>
  )
})
