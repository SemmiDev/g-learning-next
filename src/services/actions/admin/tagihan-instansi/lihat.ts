'use server'

import { DataType } from '@/services/api/admin/tagihan-instansi/lihat'
import { makeJwtGetRequestAction } from '@/utils/action'

export const lihatTagihanInstansiAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/tagihan-instansi/${id}`
  )
