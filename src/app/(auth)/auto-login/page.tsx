import AutoLoginBody from '@/components/pages/auth/auto-login/body'
import { authRoutes } from '@/config/routes'
import { redirect, RedirectType } from 'next/navigation'

type AutoLoginPageProps = {
  searchParams?: Promise<Record<string, string | string[]>>
}

export default async function AutoLoginPage({
  searchParams,
}: AutoLoginPageProps) {
  const params = await searchParams
  if (!params?.token || !params?.from) {
    redirect(authRoutes.login, RedirectType.replace)
  }

  return <AutoLoginBody />
}
