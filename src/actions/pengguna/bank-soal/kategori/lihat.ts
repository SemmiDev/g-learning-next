'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

type DataType = {
  id: string
  nama_kategori: string
  id_pengajar: string
}

export const lihatKategoriBankSoalAction = (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/kategori-bank-soal/${id}`
  )
