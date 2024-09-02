'use server'

import { UbahJatuhTempoFormSchema } from '@/components/page/admin/dashboard/modal/ubah-jatuh-tempo'
import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahJatuhTempoAction = (
  id: string,
  data: UbahJatuhTempoFormSchema
) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/admin/instansi/${id}`, {
    jatuh_tempo: data.jatuhTempo?.toISOString(),
  })
