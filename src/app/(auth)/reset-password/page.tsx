import ResetPasswordForm from '@/components/page/auth/reset-password/form'
import AuthWrapper from '@/components/shared/auth-layout/auth-wrapper'
import { authRoutes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { redirect, RedirectType } from 'next/navigation'

export const metadata = {
  ...metaObject('Lupa Kata Sandi'),
}

type ResetPasswordProps = {
  searchParams?: Promise<Record<string, string | string[]>>
}

export default async function ResetPassword({
  searchParams,
}: ResetPasswordProps) {
  if (!(await searchParams)?.token) {
    redirect(authRoutes.login, RedirectType.replace)
  }

  return (
    <AuthWrapper hideGoogleSignIn>
      <ResetPasswordForm />
    </AuthWrapper>
  )
}
