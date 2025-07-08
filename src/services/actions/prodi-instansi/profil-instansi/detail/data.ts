'use server'

import { DataType } from '@/services/api/prodi-instansi/profil-instansi/detail/data'
import { makeJwtGetRequestAction } from '@/utils/action'

export const dataProfilAction = async () =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/prodi/profil-instansi`
  )
