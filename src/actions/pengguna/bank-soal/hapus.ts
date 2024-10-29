'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusBankSoalAction = async (idKategori: string, id: string) =>
  makeJwtDeleteRequestAction(
    `${process.env.API_URL}/kategori-bank-soal/${idKategori}/bank-soal/${id}`
  )
