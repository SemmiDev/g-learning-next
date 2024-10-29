'use server'

import { makeJwtDeleteRequestAction } from '@/utils/action'

export const hapusNilaiTugasAction = async (
  idKelas: string,
  idAktifitas: string,
  id: string
) =>
  makeJwtDeleteRequestAction(
    `${process.env.API_URL}/pengajar/kelas/${idKelas}/aktifitas/${idAktifitas}/penilaian-tugas/${id}`
  )
