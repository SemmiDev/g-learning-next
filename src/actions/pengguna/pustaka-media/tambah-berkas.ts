'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahBerkasAction = (formData: FormData) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/pustaka-media/berkas`,
    formData
  )
