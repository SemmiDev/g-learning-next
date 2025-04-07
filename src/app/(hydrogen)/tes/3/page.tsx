import { notFound } from 'next/navigation'
import Tes3Table from './table'

export default function Tes3Page() {
  if (process.env.NODE_ENV !== 'development') notFound()

  return (
    <>
      <h3>Aaaa</h3>
      <Tes3Table />
    </>
  )
}
