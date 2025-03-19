'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  persentase_hadir: number
  persentase_sakit: number
  persentase_izin: number
  persentase_alpha: number
}

export const dataPersentaseKehadiranAction = async (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/peserta/kelas-akademik/${id}/absensi/persentase-kehadiran`
  )
