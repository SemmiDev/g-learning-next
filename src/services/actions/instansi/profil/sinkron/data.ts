'use server'

import { DataType } from '@/services/api/instansi/profil/sinkron/data'
import { makeJwtGetRequestAction } from '@/utils/action'

export const dataSinkronAction = async () =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/instansi/pengaturan-singkronisasi`
  )
