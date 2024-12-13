'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const absensiPesertaAction = async (
  idKelas: string,
  idAktifitas: string,
  formData: FormData
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/peserta/kelas/${idKelas}/aktifitas/${idAktifitas}/absensi`,
    formData
  )
