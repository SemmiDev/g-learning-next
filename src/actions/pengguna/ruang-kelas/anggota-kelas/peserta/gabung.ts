'use server'

import { makeJwtPostRequestAction } from '@/utils/action'

export const gabungAnggotaKelasAction = async (kode: string) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/peserta/kelas/bergabung?kode_kelas=${kode}`
  )
