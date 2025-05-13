import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  total_pertemuan: number
  total_pertemuan_terlaksana: number
  total_kehadiran_pengajar: number
  persentase_kehadiran_peserta: number
  persentase_kehadiran_pengajar: number
}

export const ringkasanKelasAction = async (idKelas: string) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/ringkasan`
  )
