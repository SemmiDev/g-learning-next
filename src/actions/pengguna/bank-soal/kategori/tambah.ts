'use server'

import { TambahKategoriFormSchema } from '@/components/page/pengguna/bank-soal/modal/tambah-kategori'
import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahKategoriBankSoalAction = async (
  data: TambahKategoriFormSchema
) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/kategori-bank-soal`, {
    nama_kategori: data.nama,
  })
