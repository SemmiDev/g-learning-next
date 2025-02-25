'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const akhiriSesiAction = async (idKelas: string, idSesi: string) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas-akademik/${idKelas}/pertemuan/${idSesi}/akhiri-sesi`
  )
