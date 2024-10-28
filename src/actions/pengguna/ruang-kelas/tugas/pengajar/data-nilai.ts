'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  grafik_nilai_tugas_tertinggi: {
    tanggal: string
    nilai: number
  }[]
  grafik_nilai_tugas_rata_rata: {
    tanggal: string
    nilai: number
  }[]
}

export const dataNilaiAction = (idKelas: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/pengajar/kelas/${idKelas}/tugas/grafik-nilai`
  )
