import { makeActionResponse } from '@/utils/action'
import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  media_personal_info: {
    kuota_terpakai_in_gb: number
    kuota_total_in_gb: number
    kuota_sisa_in_gb: number
    kuota_terpakai_in_mb: number
    kuota_total_in_mb: number
    kuota_sisa_in_mb: number
    kuota_terpakai_in_kb: number
    kuota_total_in_kb: number
    kuota_sisa_in_kb: number
  }
  daftar_media_instansi_info: {
    id_instansi: string
    nama_instansi: string
    jenis_instansi: string
    kuota_terpakai_in_gb: number
    kuota_total_in_gb: number
    kuota_sisa_in_gb: number
    kuota_terpakai_in_mb: number
    kuota_total_in_mb: number
    kuota_sisa_in_mb: number
    kuota_terpakai_in_kb: number
    kuota_total_in_kb: number
    kuota_sisa_in_kb: number
  }[]
  media_google_drive_info: {
    id_google_drive: string
    email: string
    is_unlimited: false
    kuota_terpakai_in_gb: number
    kuota_total_in_gb: number
    kuota_sisa_in_gb: number
    kuota_terpakai_in_mb: number
    kuota_total_in_mb: number
    kuota_sisa_in_mb: number
    kuota_terpakai_in_kb: number
    kuota_total_in_kb: number
    kuota_sisa_in_kb: number
    access_token: string
  } | null
}

export const driveInfoApi = async (jwt: string) => {
  if (!jwt) return makeActionResponse<DataType>(false)

  return await makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/pustaka-media/info`,
    jwt
  )
}
