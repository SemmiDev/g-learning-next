import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusMateriApi = async (
  jwt: string,
  idKategori: string,
  id: string
) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${idKategori}/bank-ajar/${id}`,
    jwt
  )
