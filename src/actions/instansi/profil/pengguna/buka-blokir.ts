'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const bukaBlokirPenggunaAction = (id: string) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/instansi/buka-blokir-pengguna/${id}`
  )
