'use server'

import { SinkronSmartFormSchema } from '@/components/page/instansi/profil/sinkron/smart-card'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahSinkronSmartAction = async (data: SinkronSmartFormSchema) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/instansi/pengaturan-singkronisasi`,
    {
      token_smart: data.token ?? '',
    }
  )
