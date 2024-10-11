'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const simpanAbsensiAktifitasAction = async (
  idKelas: string,
  id: string,
  data: {
    id_peserta: string
    status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha'
  }[]
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/pengajar/kelas/${idKelas}/aktifitas/${id}/absensi`,
    {
      peserta_kelas: data,
    }
  )
