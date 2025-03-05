import LinimasaBody from '@/components/page/pengguna/ruang-kelas/akademik/kelas/linimasa/body'
import DiskusiBody from '@/components/page/pengguna/ruang-kelas/umum/kelas/diskusi/body'

type DiskusiPageProps = { params: Promise<{ tipe: string }> }

export default async function DiskusiPage({ params }: DiskusiPageProps) {
  const { tipe: tipeKelas } = await params

  if (tipeKelas === 'akademik') return <LinimasaBody />

  return <DiskusiBody />
}
