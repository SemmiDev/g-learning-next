import cn from '@/utils/class-names'
import { ReactNode } from 'react'
import TextLabel from './label'

export type TextBorderedProps = {
  label?: string
  children?: ReactNode
  className?: string
}

export default function TextBordered({
  label,
  children,
  className,
}: TextBorderedProps) {
  return (
    <div>
      {label && <TextLabel className="mb-1.5">{label}</TextLabel>}
      <div
        className={cn(
          'flex items-center w-full text-sm min-h-10 rounded-md border-2 border-muted bg-gray-50/40 px-3.5 py-2',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
