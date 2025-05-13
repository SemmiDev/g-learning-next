import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusInstansiApi = async (jwt: string, id: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/instansi/${id}`,
    jwt
  )
