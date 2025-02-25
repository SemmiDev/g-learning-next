'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const mulaiSesiAction = async (
  idKelas: string,
  idSesi: string,
  formData: FormData
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas-akademik/${idKelas}/pertemuan/${idSesi}/buka-sesi`,
    formData
  )
