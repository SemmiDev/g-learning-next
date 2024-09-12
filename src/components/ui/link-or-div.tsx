import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { DOMAttributes, HTMLAttributeAnchorTarget, ReactNode } from 'react'

export type LinkOrDivProps = DOMAttributes<HTMLDivElement> & {
  href?: Url
  target?: HTMLAttributeAnchorTarget
  className?: string
  children?: ReactNode
}

export default function LinkOrDiv({
  href,
  target,
  children,
  className,
  ...props
}: LinkOrDivProps) {
  if (!href)
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )

  return (
    <Link target={target} href={href} className={className}>
      {children}
    </Link>
  )
}
