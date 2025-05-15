import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  total_pertemuan: number
  total_pertemuan_terlaksana: number
  total_kehadiran_pengajar: number
  persentase_kehadiran_peserta: number
  persentase_kehadiran_pengajar: number
}

export const ringkasanKelasApi = async (jwt: string, idKelas: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas-akademik/${idKelas}/ringkasan`,
    jwt
  )
