import { ReactNode } from 'react'
import { TextSpan } from '.'

type LabelProps = {
  label: ReactNode
  required?: boolean
}

export default function Label({ label, required }: LabelProps) {
  if (!required) return label

  return (
    <>
      {label} <TextSpan color="danger">*</TextSpan>
    </>
  )
}
