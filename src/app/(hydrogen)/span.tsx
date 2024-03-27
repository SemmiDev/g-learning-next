'use client'

import { useSession } from 'next-auth/react'

export default function Span() {
  const session = useSession()

  return <h3>{JSON.stringify(session)}</h3>
}
