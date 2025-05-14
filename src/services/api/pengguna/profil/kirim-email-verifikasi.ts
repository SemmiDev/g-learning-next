import { makeJwtPostRequestApi } from '@/utils/api'

export const kirimEmailVerifikasiApi = async (jwt: string, id: string) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/email/${id}/kirim-ulang-verifikasi-email`,
    jwt
  )
