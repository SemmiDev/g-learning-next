import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  poin_uts: number
  poin_uas: number
  poin_upload_bahan_ajar: number
  poin_link_konferensi: number
  poin_informasi: number
  poin_absensi: number
}

export const dataPengaturanPoinApi = async (jwt: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/instansi/pengaturan-poin`,
    jwt
  )
