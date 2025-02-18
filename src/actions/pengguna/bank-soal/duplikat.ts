'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const duplikatBankSoalAction = async (idKategori: string, id: string) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kategori-bank-soal/${idKategori}/bank-soal/${id}/duplikasi`
  )
