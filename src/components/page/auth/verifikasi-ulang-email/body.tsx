'use client'

import { verifikasiEmailAction } from '@/actions/auth/verifikasi-email'
import { Text } from '@/components/ui'
import { authRoutes, routes } from '@/config/routes'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next-nprogress-bar'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'
import { CgSpinner } from 'react-icons/cg'

export default function VerifikasiEmailBody() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const checkToken = useCallback(async () => {
    const token = searchParams.get('token') ?? ''
    const { success, data, message } = await verifikasiEmailAction(token)

    if (success) {
      const { ok } =
        (await signIn('withToken', {
          data: JSON.stringify(data),
          redirect: false,
        })) ?? {}

      if (ok) {
        toast.success(<Text>Email berhasil diverifikasi</Text>)
        router.replace(routes.pengguna.profile)
        return
      }
    } else {
      toast.error(<Text>{message}</Text>)
    }
    router.replace(authRoutes.login)
  }, [router, searchParams])

  useEffect(() => {
    checkToken()
  }, [checkToken])

  return (
    <div className="flex flex-col justify-center items-center h-svh">
      <Text weight="medium">Sedang melakukan verifikasi...</Text>
      <CgSpinner size={40} className="text-primary animate-spin" />
    </div>
  )
}
