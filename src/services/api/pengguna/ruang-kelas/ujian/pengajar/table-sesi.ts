import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  id_kelas: string
  id_pembuat: string
  tipe:
    | 'Diskusi'
    | 'Materi'
    | 'Konferensi'
    | 'Penugasan'
    | 'Ujian'
    | 'Pengumuman'
  kategori_nilai: 'Tugas' | 'UTS' | 'UAS' | null
  judul: string
  deskripsi: string
  absen: 'Manual' | 'Otomatis' | 'GPS' | 'GPS dan Swafoto' | 'QR Code' | null
  waktu_tersedia: string | null
  waktu_akhir_absen: string | null
  batas_waktu: string | null
  id_bank_soal: string | null
  acak_soal: 0 | 1 | null
  acak_jawaban: 0 | 1 | null
  waktu_mulai_ujian: string | null
  waktu_selesai_ujian: string | null
  durasi_ujian: number | null
  created_at: string
  updated_at: string
}

export const tableSesiUjianAction = async ({
  page = 1,
  search = '',
  sort,
  params,
}: ControlledAsyncTableActionProps = {}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${params?.idKelas}/ujian/aktifitas-ujian`,
    {
      current_page: page,
      keyword: search,
      sort_by: sort?.name,
      order: sort?.order,
    }
  )
