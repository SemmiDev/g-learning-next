import cn from '@/utils/class-names'
import { forwardRef } from 'react'

const cardShadows = {
  base: 'shadow',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
}

const cardRoundeds = {
  base: 'rounded',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
}

export type CardProps = {
  shadow?: keyof typeof cardShadows
  rounded?: keyof typeof cardRoundeds
  className?: string
  children?: React.ReactNode
}

export default forwardRef<HTMLDivElement, CardProps>(function Card(
  { shadow = 'base', rounded = 'md', className, children }: CardProps,
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-white border border-muted rounded-md overflow-clip p-2 dark:bg-gray-50',
        cardShadows[shadow],
        cardRoundeds[rounded],
        className
      )}
    >
      {children}
    </div>
  )
})
