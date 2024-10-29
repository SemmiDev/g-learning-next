'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusAktifitasAction = async (idKelas: string, id: string) =>
  makeJwtDeleteRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas/${id}`
  )
