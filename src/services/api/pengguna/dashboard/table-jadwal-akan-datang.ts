import { makeJwtGetRequestApi } from '@/utils/api'

type DataType = {
  id_kelas: string
  nama_kelas: string
  tipe: 'Akademik' | 'Publik' | 'Privat'
  peran: 'Pengajar' | 'Peserta'
  thumbnail: string
  nama_instansi: string
  tanggal_mulai: string
  tanggal_sampai: string
}

export const tableJadwalAkanDatangApi = async (jwt: string) =>
  makeJwtGetRequestApi<DataType[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/jadwal-kelas-mendatang`,
    jwt
  )
