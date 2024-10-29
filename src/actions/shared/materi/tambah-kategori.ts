'use server'

import { TambahKategoriFormSchema } from '@/components/shared/materi/modal/tambah-kategori'
import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahKategoriMateriAction = async (
  data: TambahKategoriFormSchema
) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/kategori-bank-ajar`, {
    nama_kategori: data.nama,
  })
