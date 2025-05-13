import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  id_kelas: string
  judul: string
  pertemuan: number
  hari: string
  waktu_mulai: string
  waktu_sampai: string
  tanggal_realisasi: string | null
  status: 'Sedang Berlangsung' | 'Belum Dibuka' | 'Telah Berakhir'
  jenis_absensi_pengajar:
    | 'Manual'
    | 'Otomatis'
    | 'GPS'
    | 'Swafoto'
    | 'GPS dan Swafoto'
    | 'QR Code'
  jenis_absensi_peserta:
    | 'Manual'
    | 'Otomatis'
    | 'GPS'
    | 'Swafoto'
    | 'GPS dan Swafoto'
    | 'QR Code'
  status_absensi_pengajar: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha' | null
  latitude: string | null
  longitude: string | null
  swafoto: string | null
  created_at: string
  updated_at: string
  lokasi_pertemuan: string
  id_kelas_semester: string
  total_bahan_ajar: number
}

export const jadwalKelasAction = async ({
  idKelas,
  hari,
}: {
  idKelas: string
  hari?: string
}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/jadwal`,
    {
      current_page: 1,
      per_page: 1,
      hari,
    }
  )
