'use server'

import { DataType } from '@/services/api/admin/tagihan-pengguna/lihat'
import { makeJwtGetRequestAction } from '@/utils/action'

export const lihatTagihanPenggunaAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/tagihan-pengguna/${id}`
  )
