import { Button } from '@/components/ui'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function TesPage() {
  if (process.env.NODE_ENV !== 'development') notFound()

  return (
    <>
      <h2>Tes Page</h2>
      <Link href="/tes/detail" scroll={false}>
        <Button>Detail Page</Button>
      </Link>
    </>
  )
}
