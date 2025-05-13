import { makeJwtPutRequestAction } from '@/utils/action'

type TipeType = '' | 'Smart' | 'Feeder'

export const aktifSinkronAction = async (tipe: TipeType) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/pengaturan-singkronisasi`,
    {
      tipe_sinkron: tipe,
    }
  )
