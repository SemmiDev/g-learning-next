import { verifikasiEmailAction } from '@/actions/auth/verifikasi-email'
import { Text } from '@/components/ui'
import { authRoutes } from '@/config/routes'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'
import { CgSpinner } from 'react-icons/cg'

export default function VerifikasiEmailBody() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const checkToken = useCallback(async () => {
    const token = searchParams.get('token') ?? ''
    const { success, message } = await verifikasiEmailAction(token)
    if (success) {
      toast.success(<Text>{message}</Text>)
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
