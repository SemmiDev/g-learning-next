'use server'

import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahSoalAction = (idBankSoal: string, id: string, data: any) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/bank-soal/${idBankSoal}/soal/${id}`,
    {}
  )
