'use server'

import { ControlledAsyncTableActionProps } from '@/components/ui/controlled-async-table'
import { PILIHAN_JAWABAN } from '@/config/const'
import {
  makeJwtGetRequestAction,
  makeJwtGetRequestTableAction,
} from '@/utils/action'

export type DataType = {
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

type ListDataType = {
  list: DataType[]
}

export const listSoalAction = async (idBankSoal: string) =>
  makeJwtGetRequestAction<ListDataType>(
    `${process.env.API_URL}/bank-soal/${idBankSoal}/soal`
  )
