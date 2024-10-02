'use client'

import { jwtDecode } from 'jwt-decode'
import { useSession } from 'next-auth/react'

export function useSessionPengguna() {
  const { data: session } = useSession()

  const decodedToken = session?.jwt ? jwtDecode<any>(session?.jwt) : {}

  return {
    id: decodedToken.id_pengguna,
    username: decodedToken.username,
    level: decodedToken.tipe,
  }
}
