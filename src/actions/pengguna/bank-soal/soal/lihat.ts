'use server'

import { PILIHAN_JAWABAN } from '@/config/const'
import { makeJwtGetRequestAction } from '@/utils/action'

type DataType = {
  id: string
  pertanyaan: string
  gambar_soal: string[]
  jawaban_a: {
    teks: string
    id_foto: string | null
    url_foto: string | null
  }
  jawaban_b: {
    teks: string
    id_foto: string | null
    url_foto: string | null
  }
  jawaban_c: {
    teks: string
    id_foto: string | null
    url_foto: string | null
  }
  jawaban_d: {
    teks: string
    id_foto: string | null
    url_foto: string | null
  }
  jawaban_e: {
    teks: string
    id_foto: string | null
    url_foto: string | null
  }
  jawaban_benar: (typeof PILIHAN_JAWABAN)[number]
}

export const lihatSoalAction = (idKategori: string, id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/kategori-bank-soal/${idKategori}/bank-soal/${id}`
  )
