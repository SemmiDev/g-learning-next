import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  persentase_hadir: number
  persentase_izin: number
  persentase_sakit: number
  persentase_alpha: number
}

export const dataPersentaseKehadiranApi = async (jwt: string, id: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/prodi/kelas/${id}/absensi/persentase-kehadiran`,
    jwt
  )
