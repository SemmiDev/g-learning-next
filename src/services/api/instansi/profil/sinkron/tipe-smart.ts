import { SinkronSmartFormSchema } from '@/components/pages/instansi/profil/sinkron/smart-card'
import { makeJwtPutRequestApi } from '@/utils/api'

export const ubahSinkronSmartApi = async (
  jwt: string,
  data: SinkronSmartFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/pengaturan-singkronisasi`,
    jwt,
    {
      token_smart: data.token ?? '',
    }
  )
