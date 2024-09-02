'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  list: {
    bulan: string
    ukuran: number
    detail: [
      {
        tipe: string
        ukuran: number
      }[]
    ]
  }[]
}

export const chartPenggunaanPenyimpananAction = (tahun: number) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/dashboard/statistik-penggunaan-penyimpanan`,
    {
      year: tahun,
    }
  )
