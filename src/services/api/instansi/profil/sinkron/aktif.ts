import { makeJwtPutRequestApi } from '@/utils/api'

type TipeType = '' | 'Smart' | 'Feeder'

export const aktifSinkronApi = async (jwt: string, tipe: TipeType) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/pengaturan-singkronisasi`,
    jwt,
    {
      tipe_sinkron: tipe,
    }
  )
