'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusNilaiUjianAction = async (
  idKelas: string,
  idAktifitas: string,
  idPeserta: string
) =>
  makeJwtDeleteRequestAction(
    `${process.env.API_URL}/pengajar/kelas/${idKelas}/aktifitas/${idAktifitas}/penilaian-ujian/${idPeserta}`
  )
