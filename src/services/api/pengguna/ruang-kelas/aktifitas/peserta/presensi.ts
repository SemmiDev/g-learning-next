import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  total_hadir: number
  total_sakit: number
  total_izin: number
  total_alpha: number
  total_keseluruhan_absensi: number
  tingkat_kehadiran: number
}

export const presensiPesertaApi = async (jwt: string, idKelas: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/peserta/kelas/${idKelas}/tingkat-kehadiran`,
    jwt
  )
