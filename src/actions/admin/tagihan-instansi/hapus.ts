'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusTagihanInstansiAction = async (id: string) =>
  makeJwtDeleteRequestAction(
    `${process.env.API_URL}/admin/tagihan-instansi/${id}`
  )
