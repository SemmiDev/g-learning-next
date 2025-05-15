import { makeBasicPostRequestApi } from '@/utils/api'

export const verifikasiEmailApi = async (token: string) =>
  makeBasicPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verifikasi-email`,
    {
      token: token,
    }
  )
