import { makeJwtPostRequestAction } from '@/utils/action'

export const kirimEmailVerifikasiAction = async (id: string) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/email/${id}/kirim-ulang-verifikasi-email`
  )
