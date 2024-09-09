'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  tipe_sinkron: string
  url_ws_feeder: string
  username_feeder: string
  kata_sandi_feeder: string
  token_smart: string
}

export const dataSinkronAction = () =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/instansi/pengaturan-singkronisasi`
  )
