'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  list: {
    id: string
    nama_paket: string
    total: number
  }[]
}

export const chartPenggunaanPaketInstansiAction = async () =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/dashboard/penggunaan-paket-instansi`
  )
