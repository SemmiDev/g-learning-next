'use client'

import { ProgressProvider } from '@bprogress/next/app'
import { ReactNode } from 'react'

export default function NextProgressProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ProgressProvider options={{ showSpinner: false }} shallowRouting>
      {children}
    </ProgressProvider>
  )
}
