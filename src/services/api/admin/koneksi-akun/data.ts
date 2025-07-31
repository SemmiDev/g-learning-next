import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  google_meet: boolean
  zoom: boolean
}

export const dataKoneksiAkunApi = async (jwt: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/koneksi-akun`,
    jwt
  )
