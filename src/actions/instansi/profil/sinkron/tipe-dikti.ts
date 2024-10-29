'use server'

import { SinkronDiktiFormSchema } from '@/components/page/instansi/profil/sinkron/dikti-card'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahSinkronDiktiAction = async (data: SinkronDiktiFormSchema) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/instansi/pengaturan-singkronisasi`,
    {
      url_ws_feeder: data.url ?? '',
      username_feeder: data.username ?? '',
      kata_sandi_feeder: data.password ?? '',
    }
  )
