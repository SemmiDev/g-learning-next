import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  total_instansi: number
  total_pengajar: number
  total_siswa: number
  total_pengguna: number
  total_kelas: number
}

export const dashboardCountApi = async (jwt: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard/statistik`,
    jwt
  )
