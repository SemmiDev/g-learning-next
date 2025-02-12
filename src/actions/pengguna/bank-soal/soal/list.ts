'use server'

import { TipeSoalType } from '@/components/page/pengguna/bank-soal/kategori/soal/body'
import { PILIHAN_JAWABAN } from '@/config/const'
import { makeJwtGetRequestAction } from '@/utils/action'
import { switchCaseObject } from '@/utils/switch-case'

export type DataType = {
  id: string
  pertanyaan: string
  tipe: 'PILIHAN_GANDA' | 'ESSAY'
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
  bobot_essay: number | null
}

type ListDataType = {
  list: DataType[]
}

export const listSoalAction = async (idBankSoal: string, tipe?: TipeSoalType) =>
  makeJwtGetRequestAction<ListDataType>(
    `${process.env.API_URL}/bank-soal/${idBankSoal}/soal`,
    {
      tipe: switchCaseObject(
        tipe,
        {
          'single-choice': 'PILIHAN_GANDA',
          essay: 'ESSAY',
        },
        undefined
      ),
    }
  )
