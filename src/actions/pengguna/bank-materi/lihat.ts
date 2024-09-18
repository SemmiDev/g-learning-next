'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

type DataType = {
  bank_ajar: {
    id: string
    id_kategori: string
    tipe: string
    judul: string
    deskripsi: string
    created_at: string
    updated_at: string
  }
  daftar_file_bank_ajar: [
    {
      id: string
      id_parent: string | null
      nama: string
      deskripsi: string
      content: string
      ekstensi: string
      tipe: string
      url: string
      ukuran: number
      id_pengguna: string
      id_instansi: string | null
      created_at: string
      updated_at: string
    }
  ]
  total_file_bank_ajar: number
}

export const lihatBankMateriAction = (idKategori: string, id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/kategori-bank-ajar/${idKategori}/bank-ajar/${id}`
  )
