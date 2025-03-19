'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const presensiSesiAction = async (
  idKelas: string,
  idSesi: string,
  formData: FormData
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas-akademik/${idKelas}/pertemuan/${idSesi}/absensi`,
    formData
  )
