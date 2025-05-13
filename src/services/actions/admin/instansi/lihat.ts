'use server'

import { DataType } from '@/services/api/admin/instansi/lihat'
import { makeJwtGetRequestAction } from '@/utils/action'

export const lihatInstansiAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/instansi/${id}`
  )
