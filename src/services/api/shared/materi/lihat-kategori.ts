import { makeJwtGetRequestApi } from '@/utils/api'

type DataType = {
  id: string
  nama_kategori: string
  id_pengguna: string
  created_at: string
  updated_at: string
}

export const lihatKategoriMateriApi = async (jwt: string, id: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${id}`,
    jwt
  )
