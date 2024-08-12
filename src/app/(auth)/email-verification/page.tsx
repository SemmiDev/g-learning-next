'use client'

import VerifikasiEmailBody from '@/components/page/auth/email-verification/body'
import { authRoutes } from '@/config/routes'
import { redirect, RedirectType } from 'next/navigation'

export default function VerifikasiEmailPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] }
}) {
  if (!searchParams?.token) {
    redirect(authRoutes.login, RedirectType.replace)
  }

  return <VerifikasiEmailBody />
}
