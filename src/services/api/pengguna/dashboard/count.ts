import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  jumlah_kelas: number
  jumlah_anggota_kelas: number
  jumlah_bank_materi: number
  jumlah_bank_soal: number
}

export const dashboardCountAction = async () =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/statistik`
  )
