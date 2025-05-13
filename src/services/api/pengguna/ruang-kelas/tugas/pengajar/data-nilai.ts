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

export const dataNilaiAction = async (idKelas: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/tugas/grafik-nilai`
  )
