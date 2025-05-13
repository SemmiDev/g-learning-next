import { makeJwtDeleteRequestApi } from '@/utils/api'

export const hapusTagihanInstansiApi = async (jwt: string, id: string) =>
  makeJwtDeleteRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/tagihan-instansi/${id}`,
    jwt
  )
