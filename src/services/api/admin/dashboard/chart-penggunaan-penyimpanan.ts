import { makeJwtGetRequestApi } from '@/utils/api'

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

export const chartPenggunaanPenyimpananApi = async (
  jwt: string,
  tahun: number
) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard/statistik-penggunaan-penyimpanan`,
    jwt,
    {
      year: tahun,
    }
  )
