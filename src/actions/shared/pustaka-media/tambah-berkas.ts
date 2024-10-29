'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const tambahBerkasAction = async (formData: FormData) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/pustaka-media/berkas`,
    formData
  )
