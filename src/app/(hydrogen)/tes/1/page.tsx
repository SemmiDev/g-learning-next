import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { Title } from '@/components/ui'
import { metaObject } from '@/config/site.config'
import { getServerSession } from 'next-auth'
import HomeBody from './body'
import { notFound } from 'next/navigation'

export const metadata = {
  ...metaObject('Testing Session'),
}

export default async function Home() {
  if (process.env.NODE_ENV !== 'development') notFound()

  const session = await getServerSession(authOptions)

  return (
    <>
      <Title>Session</Title>
      <pre className="whitespace-pre-wrap break-words mt-4">
        {JSON.stringify(session)}
      </pre>
      <HomeBody />
    </>
  )
}
