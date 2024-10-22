'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  persentase_hadir: string
  persentase_sakit: string
  persentase_izin: string
  persentase_alpha: string
}

export const dataPersentaseKehadiranAction = (id: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/peserta/kelas/${id}/absensi/persentase-kehadiran`
  )
