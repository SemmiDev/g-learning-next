'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  total_hadir: number
  total_sakit: number
  total_izin: number
  total_alpha: number
  total_keseluruhan_absensi: number
  tingkat_kehadiran: number
}

export const presensiPesertaAction = (idKelas: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/peserta/kelas/${idKelas}/tingkat-kehadiran`
  )
