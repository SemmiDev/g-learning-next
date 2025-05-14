import { SinkronDiktiFormSchema } from '@/components/pages/instansi/profil/sinkron/dikti-card'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahSinkronDiktiApi = async (
  jwt: string,
  data: SinkronDiktiFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/pengaturan-singkronisasi`,
    jwt,
    {
      url_ws_feeder: data.url ?? '',
      username_feeder: data.username ?? '',
      kata_sandi_feeder: data.password ?? '',
    }
  )
