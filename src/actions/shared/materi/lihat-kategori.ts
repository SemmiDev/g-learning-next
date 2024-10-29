'use server'

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
    `${process.env.API_URL}/kategori-bank-ajar/${id}`
  )
