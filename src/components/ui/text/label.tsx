import cn from '@/utils/class-names'
import { ReactNode } from 'react'
import { TextSpan } from '..'

type TextLabelProps = {
  children?: ReactNode
  required?: boolean
  className?: string
}

export default function TextLabel({
  children,
  required,
  className,
}: TextLabelProps) {
  return (
    <label
      className={cn(
        'block text-sm font-semibold text-gray-dark mb-0.5',
        className
      )}
    >
      {children}
      {required && (
        <>
          {' '}
          <TextSpan color="danger">*</TextSpan>
        </>
      )}
    </label>
  )
}
