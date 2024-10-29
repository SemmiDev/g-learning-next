'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusPaketInstansiAction = async (id: string) =>
  makeJwtDeleteRequestAction(
    `${process.env.API_URL}/admin/paket-instansi/${id}`
  )
