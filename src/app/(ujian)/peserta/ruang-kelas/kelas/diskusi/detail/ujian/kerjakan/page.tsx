import DaftarSoalCard from '@/components/page/peserta/ruang-kelas/kelas/diskusi/detail/ujian/kerjakan/daftar-soal-card'
import SisaWaktuCard from '@/components/page/peserta/ruang-kelas/kelas/diskusi/detail/ujian/kerjakan/sisa-waktu-card'

export default function UjianPesertaPage() {
  return (
    <div className="flex flex-col justify-stretch gap-8 py-10 md:px-10 lg:px-24 xl:px-40 xl:flex-row">
      <div className="flex flex-col gap-8 w-full xl:w-1/4">
        <SisaWaktuCard />
        <DaftarSoalCard />
      </div>
      <div className="flex flex-col flex-1 bg-yellow-200 min-h-96">Kanan</div>
    </div>
  )
}
