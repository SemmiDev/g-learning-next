import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  pengaturan_absensi_dosen_simpeg: boolean
}

export const dataPengaturanApi = async (jwt: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/pengaturan`,
    jwt
  )
