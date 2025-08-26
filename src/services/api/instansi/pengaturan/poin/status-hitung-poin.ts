import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  status: 'done' | 'in_progress'
}

export const statusHitungPoinApi = async (jwt: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/hitung-poin/status`,
    jwt
  )
