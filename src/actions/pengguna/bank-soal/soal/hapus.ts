'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusSoalAction = (idBankSoal: string, id: string) =>
  makeJwtDeleteRequestAction(
    `${process.env.API_URL}/bank-soal/${idBankSoal}/soal/${id}`
  )
