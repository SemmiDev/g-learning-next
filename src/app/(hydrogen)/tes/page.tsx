import Link from 'next/link'
import { Button } from 'rizzui'

export default function TesPage() {
  return (
    <>
      <h2>Tes Page</h2>
      <Link href="/tes/detail" scroll={false}>
        <Button>Detail Page</Button>
      </Link>
    </>
  )
}
