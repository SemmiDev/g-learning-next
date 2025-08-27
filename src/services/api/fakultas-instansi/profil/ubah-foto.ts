import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahFotoApi = async (jwt: string, formData: FormData) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/pengguna/foto-profil`,
    jwt,
    formData
  )
