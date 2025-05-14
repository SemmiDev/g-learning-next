import { makeJwtPostRequestApi } from '@/utils/api'

export const importSoalApi = async (
  jwt: string,
  idBankSoal: string,
  formData: FormData
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/bank-soal/${idBankSoal}/import`,
    jwt,
    formData
  )
