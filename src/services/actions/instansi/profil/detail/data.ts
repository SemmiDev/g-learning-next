'use server'

import { DataType } from '@/services/api/instansi/profil/detail/data'
import { makeJwtGetRequestAction } from '@/utils/action'

export const dataProfilAction = async () =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/instansi/profil-instansi`
  )
