import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  total: number
  digunakan: number
  tersedia: number
}

export const totalRuangPenyimpananApi = async (jwt: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/fakultas/total-ruang-penyimpanan`,
    jwt
  )
