import MulaiSesiBody from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/pengajar/mulai-sesi/body'
import { notFound } from 'next/navigation'

type MulaiSesiPageProps = {
  params: Promise<{ jenis: string }>
}

export default async function MulaiSesiPage({ params }: MulaiSesiPageProps) {
  const { jenis: jenisKelas } = await params

  if (jenisKelas !== 'dikelola') notFound()

  return <MulaiSesiBody />
}
