import { metaObject } from '@/config/site.config'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'
import Span from './span'
import { Title } from '@/components/ui'

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
