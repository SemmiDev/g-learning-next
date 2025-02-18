'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const kirimEmailVerifikasiAction = async (id: string) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/email/${id}/kirim-ulang-verifikasi-email`
  )
