import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  id: string
  nama_kategori: string
  id_pengajar: string
}

export const lihatKategoriBankSoalApi = async (jwt: string, id: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal/${id}`,
    jwt
  )
