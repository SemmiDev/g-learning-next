import KerjakanUjianBody from '@/components/page/peserta/ruang-kelas/kelas/diskusi/detail/ujian/kerjakan/ujian-body'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Kerjakan Ujian'),
}

export default function UjianPesertaPage() {
  return (
    <div className="flex flex-col justify-stretch gap-8 py-10 px-2 md:px-10 lg:px-24 xl:px-40 xl:flex-row">
      <KerjakanUjianBody />
    </div>
  )
}
