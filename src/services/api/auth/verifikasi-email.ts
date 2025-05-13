import { makeBasicPostRequestAction } from '@/utils/action'

export const verifikasiEmailAction = async (token: string) =>
  makeBasicPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verifikasi-email`,
    {
      token: token,
    }
  )
