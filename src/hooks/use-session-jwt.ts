import { useSession } from 'next-auth/react'

export function useSessionJwt() {
  const { data: session } = useSession()

  return session?.jwt || ''
}
