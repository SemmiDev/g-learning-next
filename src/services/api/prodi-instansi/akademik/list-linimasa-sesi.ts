import { makeJwtGetRequestTableApi } from '@/utils/api'
import { mustBe } from '@/utils/must-be'

export type DataType = {
  id: string
  id_kelas: string
  id_pengajar: string | null
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
  id_ruangan: string
  created_at: string
  updated_at: string
  nama_kelas: string
  nama_pengajar: string
  sub_judul: string
  lokasi_pertemuan: string
  id_kelas_semester: string
}

export const listLinimasaSesiApi = async ({
  jwt,
  page = 1,
  search = '',
  semester,
  idSms,
  rentangWaktu,
  tanggalMulai,
  tanggalSampai,
}: {
  jwt: string
  page?: number
  search?: string
  semester?: string
  idSms?: string
  rentangWaktu?: string
  tanggalMulai?: string
  tanggalSampai?: string
}) =>
  makeJwtGetRequestTableApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/prodi/timeline-pertemuan`,
    jwt,
    {
      current_page: page,
      keyword: search,
      per_page: 20,
      semester,
      id_sms: idSms,
      rentang_waktu: mustBe(
        rentangWaktu,
        ['Hari Ini', 'Minggu Ini', 'Bulan Ini', 'Rentang Waktu'] as const,
        'Hari Ini'
      ),
      tanggal_mulai:
        rentangWaktu === 'Rentang Waktu' ? tanggalMulai : undefined,
      tanggal_sampai:
        rentangWaktu === 'Rentang Waktu' ? tanggalSampai : undefined,
    }
  )
