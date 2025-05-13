import { makeJwtGetRequestAction } from '@/utils/action'

type DataType = {
  id: string
  nama_kategori: string
  id_pengguna: string
  created_at: string
  updated_at: string
}

export const lihatKategoriMateriAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${id}`
  )
