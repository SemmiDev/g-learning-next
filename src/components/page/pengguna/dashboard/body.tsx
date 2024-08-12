import { useSession } from 'next-auth/react'

export default function DashboardBody() {
  const { data: session } = useSession()

  return (
    <div>
      <h3>Halaman Dasbor Pengguna</h3>
      <div className="text-wrap">{JSON.stringify(session)}</div>
    </div>
  )
}
