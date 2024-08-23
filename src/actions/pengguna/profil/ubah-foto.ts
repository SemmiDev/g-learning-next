'use server'

import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahFotoAction = (formData: FormData) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/pengguna/foto-profil`,
    formData
  )
