'use server'

import { makeJwtPutRequestAction } from '@/utils/action'

type TipeType = '' | 'Smart' | 'Feeder'

export const aktifSinkronAction = async (tipe: TipeType) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/instansi/pengaturan-singkronisasi`,
    {
      tipe_sinkron: tipe,
    }
  )
