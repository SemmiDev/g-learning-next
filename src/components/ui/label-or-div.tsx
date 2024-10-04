import { ReactNode } from 'react'

export type LabelOrDivProps = {
  label?: boolean
  children: ReactNode
  className?: string
}

export default function LabelOrDiv({ label, ...props }: LabelOrDivProps) {
  if (label) return <label {...props} />

  return <div {...props} />
}
