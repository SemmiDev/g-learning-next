import cn from '@/utils/class-names'
import { ReactNode } from 'react'

export default function TextLabel({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <label
      className={cn(
        'block text-sm font-semibold text-gray-dark mb-0.5',
        className
      )}
    >
      {children}
    </label>
  )
}
