import { makeJwtGetRequestApi } from '@/utils/api'

type DataType = {
  id: string
  nama: string
  batas_penyimpanan: number
  batas_kelas: number
  batas_anggota_kelas: number
  tipe: 'Default' | 'Custom'
  harga: number
  created_at: string
  updated_at: string
}

export const lihatPaketPenggunaApi = async (jwt: string, id: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/paket-pengguna/${id}`,
    jwt
  )
