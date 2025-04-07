import { notFound } from 'next/navigation'

export default function TesDetailPage() {
  if (process.env.NODE_ENV !== 'development') notFound()

  return (
    <>
      <h2>Tes Detail Page</h2>
    </>
  )
}
