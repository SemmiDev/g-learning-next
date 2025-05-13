import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusPaketInstansiApi = async (jwt: string, id: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/paket-instansi/${id}`,
    jwt
  )
