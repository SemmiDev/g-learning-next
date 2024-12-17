import DiskusiMateriBody from '@/components/page/pengguna/ruang-kelas/kelas/diskusi/detail-materi/body'
import { routes } from '@/config/routes'
import { userAgentMobile } from '@/utils/user-agent'
import { redirect } from 'next/navigation'

type DiskusiMateriPageProps = {
  params: Promise<{ kelas: string; id: string }>
}

export default async function DiskusiMateriPage({
  params,
}: DiskusiMateriPageProps) {
  const isMobile = await userAgentMobile()

  const { kelas: idKelas } = await params

  if (!isMobile) redirect(`${routes.pengguna.ruangKelas}/${idKelas}`)

  return <DiskusiMateriBody />
}
