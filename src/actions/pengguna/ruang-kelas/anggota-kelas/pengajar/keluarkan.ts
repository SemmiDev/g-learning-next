'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const keluarkanAnggotaKelasAction = async (
  idKelas: string,
  idPeserta: string
) =>
  makeJwtDeleteRequestAction(
    `${process.env.API_URL}/pengajar/kelas/${idKelas}/peserta-kelas/${idPeserta}`
  )
