import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusPaketPenggunaApi = async (jwt: string, id: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/paket-pengguna/${id}`,
    jwt
  )
