import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusKategoriMateriApi = async (jwt: string, id: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${id}`,
    jwt
  )
