import { makeJwtGetRequestTableApi } from '@/utils/api'

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
  nama_pengajar: string
  nama_kelas: string
  sub_judul: string
  lokasi_pertemuan: string
  id_kelas_semester: string
}

export const listJadwalApi = async ({
  jwt,
  page = 1,
  search = '',
  kategori,
  hari,
  semester,
}: {
  jwt: string
  page?: number
  search?: string
  kategori?: 'Dikelola' | 'Diikuti'
  hari?: string
  semester?: string
}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/jadwal`,
    jwt,
    {
      current_page: page,
      keyword: search,
      per_page: 20,
      kategori,
      hari,
      semester,
    }
  )
