import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  list: {
    id: string
    nama_paket: string
    total: number
  }[]
}

export const chartPenggunaanPaketInstansiApi = async (jwt: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard/penggunaan-paket-instansi`,
    jwt
  )
