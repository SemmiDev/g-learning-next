'use server'

import { DataType } from '@/services/api/pengguna/bank-soal/lihat'
import { makeJwtGetRequestAction } from '@/utils/action'

export const lihatBankSoalAction = async (idKategori: string, id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/kategori-bank-soal/${idKategori}/bank-soal/${id}`
  )
