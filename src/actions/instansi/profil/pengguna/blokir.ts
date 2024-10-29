'use server'

import { BlokirPenggunaFormSchema } from '@/components/page/instansi/profil/pengguna/modal/blokir'
import { makeJwtPostRequestAction } from '@/utils/action'

export const blokirPenggunaAction = async (
  id: string,
  data: BlokirPenggunaFormSchema
) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/instansi/blokir-pengguna`, {
    id: id,
    keterangan: data.alasan,
  })
