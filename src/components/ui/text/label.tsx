import cn from '@/utils/class-names'
import { ReactNode } from 'react'

type TextLabelProps = {
  children?: ReactNode
  className?: string
}

export default function TextLabel({ children, className }: TextLabelProps) {
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
