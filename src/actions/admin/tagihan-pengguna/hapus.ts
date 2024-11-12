'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusTagihanPenggunaAction = async (id: string) =>
  makeJwtDeleteRequestAction(
    `${process.env.API_URL}/admin/tagihan-pengguna/${id}`
  )
