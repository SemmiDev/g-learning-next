import { makeJwtPostRequestAction } from '@/utils/action'

export const importSoalAction = async (
  idBankSoal: string,
  formData: FormData
) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/bank-soal/${idBankSoal}/import`,
    formData
  )
