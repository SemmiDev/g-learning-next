'use server'

import { TambahKategoriFormSchema } from '@/components/page/pengguna/bank-materi/modal/tambah-kategori'
import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahKategoriBankMateriAction = (
  data: TambahKategoriFormSchema
) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/kategori-bank-ajar`, {
    nama_kategori: data.nama,
  })
