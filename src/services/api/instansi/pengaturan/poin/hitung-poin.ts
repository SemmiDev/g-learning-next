import { makeJwtPostRequestApi } from '@/utils/api'

export const hitungPoinApi = async (jwt: string) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/hitung-poin`,
    jwt
  )
