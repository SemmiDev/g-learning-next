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
  total_soal: number
  total_soal_essay: number
  total_soal_pilihan_ganda: number
  total_aktifitas: number
  persentase_essay: number
  persentase_pilihan_ganda: number
  created_at: string
  update_at: string
}

export const lihatPaketSoalAction = async (idKategori: string, id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/kategori-bank-soal/${idKategori}/bank-soal/${id}`
  )
