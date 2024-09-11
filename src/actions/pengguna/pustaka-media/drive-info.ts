'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

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
}

export const driveInfoAction = () =>
  makeJwtGetRequestAction<DataType>(`${process.env.API_URL}/pustaka-media/info`)
