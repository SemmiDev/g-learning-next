import SelesaiUjianBody from '@/components/page/peserta/ruang-kelas/kelas/diskusi/detail/ujian/selesai/selesai-body'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Selesai Ujian'),
}

export default function SelesaiUjianPesertaPage() {
  return (
    <div className="flex justify-center gap-8 py-10 px-2 md:px-10 lg:px-24 xl:px-40">
      <SelesaiUjianBody />
    </div>
  )
}
