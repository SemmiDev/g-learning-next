import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  jumlah_kelas: number
  jumlah_anggota_kelas: number
  jumlah_bank_materi: number
  jumlah_bank_soal: number
}

export const dashboardCountApi = async (jwt: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/statistik`,
    jwt
  )
