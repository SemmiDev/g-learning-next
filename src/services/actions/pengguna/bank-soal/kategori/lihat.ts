'use server'

import { DataType } from '@/services/api/pengguna/bank-soal/kategori/lihat'
import { makeJwtGetRequestAction } from '@/utils/action'

export const lihatKategoriBankSoalAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/kategori-bank-soal/${id}`
  )
