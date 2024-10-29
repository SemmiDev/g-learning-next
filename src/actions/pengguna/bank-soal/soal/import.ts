'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const importSoalAction = async (
  idBankSoal: string,
  formData: FormData
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/bank-soal/${idBankSoal}/import`,
    formData
  )
