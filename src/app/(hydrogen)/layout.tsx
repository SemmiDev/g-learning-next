'use client'

import HydrogenLayout from '@/layouts/hydrogen/layout'
import { useSession } from 'next-auth/react'
import { RiLoader5Fill } from 'react-icons/ri'

type LayoutProps = {
  children: React.ReactNode
}

export default function DefaultLayout({ children }: LayoutProps) {
  const { status } = useSession()

  if (status !== 'authenticated') {
    return (
      <div className="flex justify-center items-center h-svh">
        <RiLoader5Fill size={40} className="text-primary animate-spin" />
      </div>
    )
  }

  return <HydrogenLayout>{children}</HydrogenLayout>
}
