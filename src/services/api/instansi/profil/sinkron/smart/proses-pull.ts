import { makeJwtPostRequestApi } from '@/utils/api'

export const prosesPullSmartApi = async (jwt: string, semester: string) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/singkronisasi?semester=${semester}`,
    jwt
  )
