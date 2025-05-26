import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  id: string
  id_instansi: null
  id_pengajar: string
  nama_kelas: string
  sub_judul: string
  status: string
  deskripsi: string
  tipe: 'Akademik' | 'Publik' | 'Privat'
  kode_unik: string
  thumbnail: string
  total_pertemuan: number | null
  total_peserta: number
  pengajar: {
    id: string
    username: string
    nama: string
    foto: string
  }[]
  status_gabung: 'Pengajuan' | 'Diterima' | null
  created_at: string
  updated_at: string
}

export const lihatUndanganKelasApi = async (jwt: string, kode: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-publik?kode_unik=${kode}`,
    jwt
  )
