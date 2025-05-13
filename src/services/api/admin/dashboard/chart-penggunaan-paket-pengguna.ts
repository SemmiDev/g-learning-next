import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  list: {
    id: string
    nama_paket: string
    total: number
  }[]
}

export const chartPenggunaanPaketPenggunaApi = async (jwt: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard/penggunaan-paket-pengguna`,
    jwt
  )
