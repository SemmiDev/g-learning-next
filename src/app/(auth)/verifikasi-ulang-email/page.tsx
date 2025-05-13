import VerifikasiEmailBody from '@/components/pages/auth/verifikasi-ulang-email/body'
import { authRoutes } from '@/config/routes'
import { redirect, RedirectType } from 'next/navigation'

type VerifikasiEmailPageProps = {
  searchParams?: Promise<Record<string, string | string[]>>
}

export default async function VerifikasiEmailPage({
  searchParams,
}: VerifikasiEmailPageProps) {
  if (!(await searchParams)?.token) {
    redirect(authRoutes.login, RedirectType.replace)
  }

  return <VerifikasiEmailBody />
}
