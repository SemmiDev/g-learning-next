import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  tipe_sinkron: string
  url_ws_feeder: string
  username_feeder: string
  kata_sandi_feeder: string
  token_smart: string
}

export const dataSinkronApi = async (jwt: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/pengaturan-singkronisasi`,
    jwt
  )
