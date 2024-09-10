'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  jumlah_kelas: number
  jumlah_anggota_kelas: number
  jumlah_bank_materi: number
  jumlah_bank_soal: number
}

export const dashboardCountAction = () =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/dashboard/statistik`
  )
