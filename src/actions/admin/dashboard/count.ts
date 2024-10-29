'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  total_instansi: number
  total_pengajar: number
  total_siswa: number
  total_pengguna: number
  total_kelas: number
}

export const dashboardCountAction = async () =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/admin/dashboard/statistik`
  )
