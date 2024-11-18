import KerjakanUjianBody from '@/components/page/pengguna/ruang-kelas/kelas/diskusi/detail-ujian/kerjakan/ujian-body'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Kerjakan Ujian'),
}

export default function UjianPesertaPage() {
  return <KerjakanUjianBody />
}
