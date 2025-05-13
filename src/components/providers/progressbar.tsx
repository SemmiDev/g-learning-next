'use client'

import { ProgressProvider } from '@bprogress/next/app'
import { ReactNode } from 'react'

export default function ProgressbarProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ProgressProvider
      color="#2563eb"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  )
}
