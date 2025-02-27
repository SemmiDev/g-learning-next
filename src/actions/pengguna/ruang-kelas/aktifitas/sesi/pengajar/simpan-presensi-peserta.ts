'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const simpanPresensiPesertaSesiAction = async (
  idKelas: string,
  idSesi: string,
  data: {
    id_peserta: string
    status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha'
  }[]
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas-akademik/${idKelas}/pertemuan/${idSesi}/absensi-peserta`,
    {
      peserta_kelas: data,
    }
  )
