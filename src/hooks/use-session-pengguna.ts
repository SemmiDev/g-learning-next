'use client'

import { jwtDecode } from 'jwt-decode'
import { useSession } from 'next-auth/react'

export function useSessionPengguna() {
  const { data: session } = useSession()

  const decodedToken = session?.jwt ? jwtDecode<any>(session?.jwt) : {}

  return {
    id: decodedToken.id_pengguna as string,
    username: session?.user?.username || undefined,
    name: session?.user?.name || undefined,
    image: session?.user?.image || undefined,
    level: session?.user?.level || undefined,
  }
}
