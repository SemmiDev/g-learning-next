import { makeJwtPostRequestApi } from '@/utils/api'

export const duplikatBankSoalApi = async (
  jwt: string,
  idKategori: string,
  id: string
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal/${idKategori}/bank-soal/${id}/duplikasi`,
    jwt
  )
