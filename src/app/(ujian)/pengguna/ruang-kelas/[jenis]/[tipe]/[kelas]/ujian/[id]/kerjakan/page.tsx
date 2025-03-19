import { lihatHasilUjianAction } from '@/actions/pengguna/ruang-kelas/aktifitas/peserta/lihat-hasil-ujian'
import KerjakanUjianBody from '@/components/page/pengguna/ruang-kelas/umum/kelas/diskusi/detail-ujian/kerjakan/ujian-body'
import { metaObject } from '@/config/site.config'
import { betweenTime } from '@/utils/time'
import { notFound } from 'next/navigation'

export const metadata = {
  ...metaObject('Kerjakan Ujian'),
}

type UjianPesertaPageProps = {
  params: Promise<{ kelas: string; id: string }>
}

export default async function UjianPesertaPage({
  params,
}: UjianPesertaPageProps) {
  const { kelas: idKelas, id } = await params

  const { data, code } = await lihatHasilUjianAction(idKelas, id)

  if (code === 404) return notFound()

  const selesai = !!data?.jawaban.waktu_selesai
  const dalamJadwal = betweenTime(
    data?.aktifitas.waktu_mulai_ujian,
    data?.aktifitas.waktu_selesai_ujian
  )

  if (selesai || !dalamJadwal) return notFound()

  return <KerjakanUjianBody />
}
