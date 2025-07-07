import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  kelas: {
    id: string
    id_instansi: string | null
    id_pengajar: string
    nama_kelas: string
    sub_judul: string
    id_kelas_instansi: string
    id_kelas_semester: string
    status: string
    deskripsi: string
    tipe: 'Akademik' | 'Publik' | 'Privat'
    kode_unik: string
    thumbnail: string
    total_pertemuan: number | null
    nama_instansi: string
    verifikasi_instansi: boolean
    created_at: string
    updated_at: string
  }
  jadwal: {
    id: string
    id_kelas: string
    hari: string
    waktu_mulai: string
    waktu_sampai: string
    zona_waktu: string
    ruangan: string | null
    created_at: string
    updated_at: string
  }[]
  total_peserta: number
  pengajar: {
    id: string
    username: string
    nama: string
    foto: string
  }[]
  pengaturan_absensi_peserta: (
    | 'Manual'
    | 'Otomatis'
    | 'GPS'
    | 'Swafoto'
    | 'GPS dan Swafoto'
    | 'QR Code'
  )[]
  total_pertemuan_terlaksana: number
}

export const lihatKelasApi = async (jwt: string, id: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/prodi/kelas/${id}`,
    jwt
  )
