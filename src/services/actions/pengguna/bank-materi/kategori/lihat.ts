'use server'

import { DataType } from '@/services/api/pengguna/bank-materi/kategori/lihat'
import { makeJwtGetRequestAction } from '@/utils/action'

export const lihatKategoriBankMateriAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/kategori-bank-ajar/${id}`
  )
