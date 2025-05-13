'use client'

import { publicRoutes } from '@/config/routes'
import { useRouter } from '@bprogress/next/app'
import { useQueryClient } from '@tanstack/react-query'
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'
import { CgSpinner } from 'react-icons/cg'

export default function LogoutBody() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const doLogout = async () => {
    await signOut({ redirect: false })
    router.replace(publicRoutes.login)
    queryClient.invalidateQueries()
  }

  useEffect(() => {
    doLogout()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center h-svh">
      <CgSpinner size={40} className="text-primary animate-spin" />
    </div>
  )
}
