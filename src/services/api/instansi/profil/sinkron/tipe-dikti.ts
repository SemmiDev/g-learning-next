import { SinkronDiktiFormSchema } from '@/components/pages/instansi/profil/sinkron/dikti-card'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahSinkronDiktiAction = async (data: SinkronDiktiFormSchema) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/pengaturan-singkronisasi`,
    {
      url_ws_feeder: data.url ?? '',
      username_feeder: data.username ?? '',
      kata_sandi_feeder: data.password ?? '',
    }
  )
