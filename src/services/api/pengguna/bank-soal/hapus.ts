import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusBankSoalApi = async (
  jwt: string,
  idKategori: string,
  id: string
) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal/${idKategori}/bank-soal/${id}`,
    jwt
  )
