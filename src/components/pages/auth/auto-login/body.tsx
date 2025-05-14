'use client'

import { Text } from '@/components/ui'
import { authRoutes, routes } from '@/config/routes'
import { autoLoginApi } from '@/services/api/auth/auto-login'
import { useRouter } from '@bprogress/next/app'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'
import { CgSpinner } from 'react-icons/cg'

export default function AutoLoginBody() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const checkToken = useCallback(async () => {
    const token = searchParams.get('token') ?? ''
    const from = searchParams.get('from') ?? ''
    const { success, data, message } = await autoLoginApi(token, from)

    if (success) {
      const { ok } =
        (await signIn('withToken', {
          data: JSON.stringify(data),
          redirect: false,
        })) ?? {}

      if (ok) {
        toast.success(<Text>Berhasil masuk</Text>)
        if (data?.peran && data?.id_kelas) {
          const jenisKelas = data?.peran === 'Pengajar' ? 'dikelola' : 'diikuti'
          router.replace(
            `${routes.pengguna.ruangKelas[jenisKelas].akademik}/${data?.id_kelas}`
          )
        } else {
          router.replace(routes.dashboard)
        }
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
      <Text weight="medium">Sedang mencoba masuk...</Text>
      <CgSpinner size={40} className="text-primary animate-spin" />
    </div>
  )
}
