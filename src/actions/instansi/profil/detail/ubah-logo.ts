'use server'

import { makeJwtPutRequestAction } from '@/utils/action'

type DataType = {
  logo: string
}

export const ubahLogoAction = (formData: FormData) =>
  makeJwtPutRequestAction<DataType>(
    `${process.env.API_URL}/instansi/profil-instansi/logo`,
    formData
  )
