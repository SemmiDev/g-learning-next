import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { Title } from '@/components/ui'
import { metaObject } from '@/config/site.config'
import { getServerSession } from 'next-auth'
import HomeBody from './body'

export const metadata = {
  ...metaObject('Testing Session'),
}

export default async function Home() {
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
