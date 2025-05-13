import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  total: number
  digunakan: number
  tersedia: number
}

export const totalRuangPenyimpananAction = async () =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/total-ruang-penyimpanan`
  )
