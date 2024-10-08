import { forwardRef } from 'react'
import {
  Textarea as RizTextarea,
  TextareaProps as RizTextareaProps,
} from 'rizzui'

export type TextareaProps = RizTextareaProps

export default forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { ...props }: TextareaProps,
  ref
) {
  return <RizTextarea ref={ref} {...props} />
})
