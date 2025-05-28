import {
  DetailedHTMLProps,
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from 'react'

type DefaultProps = {
  children: ReactNode
  className?: string
}

type LabelProps = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> &
  DefaultProps & {
    label: true
  }

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  DefaultProps & {
    label?: false
  }

export type LabelOrDivProps = LabelProps | DivProps

export default function LabelOrDiv(props: LabelOrDivProps) {
  if (props.label) {
    const { label, ...otherProps } = props

    return <label {...otherProps} />
  }

  const { label, ...otherProps } = props

  return <div {...otherProps} />
}
