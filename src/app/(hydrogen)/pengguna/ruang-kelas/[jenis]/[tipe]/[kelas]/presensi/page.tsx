import PresensiAkademikBody from '@/components/page/pengguna/ruang-kelas/akademik/kelas/presensi/body'
import PresensiUmumBody from '@/components/page/pengguna/ruang-kelas/umum/kelas/presensi/body'

type PresensiPageProps = {
  params: Promise<{ tipe: string }>
}

export default async function PresensiPage({ params }: PresensiPageProps) {
  const { tipe: tipeKelas } = await params

  if (tipeKelas === 'akademik') return <PresensiAkademikBody />

  return <PresensiUmumBody />
}
