'use server'

import { PILIHAN_JAWABAN } from '@/config/const'
import { makeJwtPostRequestAction } from '@/utils/action'

type DataType = {
  jawaban: {
    id: string
    jw: string
  }[]
  durasi: number
}

export const selesaiUjianAction = async (
  idKelas: string,
  id: string,
  data: DataType
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/peserta/kelas/${idKelas}/aktifitas/${id}/sesi-ujian/selesaikan`,
    data
  )
