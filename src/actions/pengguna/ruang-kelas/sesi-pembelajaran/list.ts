'use server'

import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  id_kelas: string
  judul: string
  pertemuan: number
  hari:
    | 'Senin'
    | 'Selasa'
    | 'Rabu'
    | 'Kamis'
    | 'Jumat'
    | 'Sabtu'
    | 'Minggu'
    | null
  waktu_mulai: string
  waktu_sampai: string
  tanggal_realisasi: string | null
  status: 'Sedang Berlangsung' | 'Belum Dibuka' | 'Telah Berakhir'
  jenis_absensi_pengajar: 'GPS' | 'Swafoto' | 'GPS dan Swafoto'
  jenis_absensi_peserta:
    | 'Manual'
    | 'Otomatis'
    | 'GPS'
    | 'Swafoto'
    | 'GPS dan Swafoto'
  status_absensi_pengajar: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha' | null
  latitude: number | null
  longitude: number | null
  swafoto: string | null
  created_at: string
  updated_at: string
  swafoto_url: string | null
  lokasi_pertemuan: string
  total_bahan_ajar: number
  status_absensi_siswa: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha' | null
}

export const listSesiPembelajaranAction = async ({
  page = 1,
  search = '',
  idKelas,
}: {
  page?: number
  search?: string
  idKelas: string
}) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/kelas-akademik/${idKelas}/pertemuan`,
    {
      current_page: page,
      keyword: search,
      per_page: 20,
    }
  )
