'use server'

import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahKategoriBankSoalAction = (id: string, data: any) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/kategori-bank-soal/${id}`, {
    nama_kategori: data.nama,
  })
