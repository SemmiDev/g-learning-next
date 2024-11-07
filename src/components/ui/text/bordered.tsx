import cn from '@/utils/class-names'
import { ReactNode } from 'react'
import TextLabel from './label'

export type TextBorderedProps = {
  label?: ReactNode
  children?: ReactNode
  className?: string
  containerClassName?: string
}

export default function TextBordered({
  label,
  children,
  className,
  containerClassName,
}: TextBorderedProps) {
  return (
    <div className={cn(className)}>
      {label && <TextLabel className="mb-1.5">{label}</TextLabel>}
      <div
        className={cn(
          'flex items-center w-full text-sm min-h-10 rounded-md border-2 border-muted bg-gray-50/60 px-3.5 py-2',
          containerClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
