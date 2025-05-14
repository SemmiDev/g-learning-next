import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusKategoriBankSoalApi = async (jwt: string, id: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal/${id}`,
    jwt
  )
