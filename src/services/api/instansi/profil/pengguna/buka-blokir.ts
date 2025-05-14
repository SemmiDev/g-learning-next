import { makeJwtPostRequestApi } from '@/utils/api'

export const bukaBlokirPenggunaApi = async (jwt: string, id: string) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/buka-blokir-pengguna/${id}`,
    jwt
  )
