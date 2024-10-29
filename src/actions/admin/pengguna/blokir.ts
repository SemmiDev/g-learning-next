'use server'

import { BlokirPenggunaFormSchema } from '@/components/page/admin/pengguna/modal/blokir'
import { makeJwtPostRequestAction } from '@/utils/action'

export const blokirPenggunaAction = async (
  id: string,
  data: BlokirPenggunaFormSchema
) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/admin/blokir-pengguna`, {
    id: id,
    keterangan: data.alasan,
  })
