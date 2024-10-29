'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusSoalAction = async (idBankSoal: string, id: string) =>
  makeJwtDeleteRequestAction(
    `${process.env.API_URL}/bank-soal/${idBankSoal}/soal/${id}`
  )
