'use server'

import { makeJwtGetRequestAction } from '@/utils/action'

export type DataType = {
  id: string
  id_kelas: string
  id_pertemuan_kelas: string
  id_peserta: string
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha' | null
  latitude: number | null
  longitude: number | null
  swafoto: string | null
  created_at: string
  updated_at: string
  username: string
  foto: string
  nama: string
  email: string
  swafoto_url: string | null
}

export const lihatPresensiPesertaSesiAction = async (
  idKelas: string,
  idSesi: string,
  idPeserta: string
) =>
  makeJwtGetRequestAction<DataType>(
    `${process.env.API_URL}/kelas-akademik/${idKelas}/pertemuan/${idSesi}/absensi-peserta/${idPeserta}`
  )
