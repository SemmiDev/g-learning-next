import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusSoalApi = async (
  jwt: string,
  idBankSoal: string,
  id: string
) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/bank-soal/${idBankSoal}/soal/${id}`,
    jwt
  )
