'use client'

import { useSession } from 'next-auth/react'

export default function HomeBody() {
  const { data: session } = useSession()

  return (
    <pre className="whitespace-pre-wrap break-words mt-4">
      {JSON.stringify(session)}
    </pre>
  )
}
