'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

type DataType = {
  id: string
  id_kategori: string
  id_pengajar: string
  judul: string
  deskripsi: string
  jumlah_soal_yang_digunakan: number
  bobot_benar: number
  bobot_salah: number
  bobot_kosong: number
  created_at: string
  update_at: string
}

export const lihatPaketSoalAction = (idKategori: string, id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/kategori-bank-soal/${idKategori}/bank-soal/${id}`
  )
