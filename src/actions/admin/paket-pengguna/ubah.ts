'use server'

import { makeJwtPutRequestAction } from '@/utils/action'

export const ubahPaketPenggunaAction = (
  id: string
  // data: UbahAdminFormSchema
) => makeJwtPutRequestAction(`${process.env.API_URL}/paket-pengguna/${id}`, {})
