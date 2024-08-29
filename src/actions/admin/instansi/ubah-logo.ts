'use server'

import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahLogoAction = (id: string, formData: FormData) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/admin/instansi/${id}/logo`,
    formData
  )
