import { Title } from 'rizzui'
import { metaObject } from '@/config/site.config'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'
import { useSession } from 'next-auth/react'
import Span from './span'

export const metadata = {
  ...metaObject('Dashboard'),
}

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <Title>Selamat Datang</Title>
      <div className="mt-4">{JSON.stringify(session)}</div>
      <Span />
    </>
  )
}
