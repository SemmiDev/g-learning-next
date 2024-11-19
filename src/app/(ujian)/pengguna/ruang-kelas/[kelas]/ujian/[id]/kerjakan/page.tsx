import { lihatHasilUjianAction } from '@/actions/pengguna/ruang-kelas/aktifitas/peserta/lihat-hasil-ujian'
import KerjakanUjianBody from '@/components/page/pengguna/ruang-kelas/kelas/diskusi/detail-ujian/kerjakan/ujian-body'
import { metaObject } from '@/config/site.config'
import { parseDate } from '@/utils/date'
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
  const jadwalMulai = parseDate(data?.aktifitas.waktu_mulai_ujian)
  const jadwalSelesai = parseDate(data?.aktifitas.waktu_selesai_ujian)
  const dalamJadwal =
    !!jadwalMulai &&
    !!jadwalSelesai &&
    jadwalMulai <= new Date() &&
    jadwalSelesai >= new Date()

  if (selesai || !dalamJadwal) return notFound()

  return <KerjakanUjianBody />
}
