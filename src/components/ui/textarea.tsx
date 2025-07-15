import cn from '@/utils/class-names'
import { forwardRef } from 'react'
import {
  Textarea as RizTextarea,
  TextareaProps as RizTextareaProps,
} from 'rizzui'

export type TextareaProps = RizTextareaProps

export default forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { textareaClassName, ...props }: TextareaProps,
  ref
) {
  return (
    <RizTextarea
      ref={ref}
      textareaClassName={cn(
        {
          'px-2': props.size === 'sm',
        },
        textareaClassName
      )}
      {...props}
    />
  )
})
