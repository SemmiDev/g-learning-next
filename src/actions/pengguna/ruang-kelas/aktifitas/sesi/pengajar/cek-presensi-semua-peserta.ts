'use server'

import { makeJwtGetRequestTableAction } from '@/utils/action'

export type DataType = {
  id: string
  id_kelas: string
  id_pertemuan_kelas: string
  id_peserta: string
  status: string | null
  latitude: number | null
  longitude: number | null
  swafoto: string | null
  created_at: string
  updated_at: string
  username: string
  nama: string
  email: string
  swafoto_url: string | null
  foto: string
}

export const cekPresensiSemuaPesertaSesiAction = async (
  idKelas: string,
  idSesi: string
) =>
  makeJwtGetRequestTableAction<DataType>(
    `${process.env.API_URL}/kelas-akademik/${idKelas}/pertemuan/${idSesi}/absensi-peserta`,
    {
      per_page: 10000,
    }
  )
