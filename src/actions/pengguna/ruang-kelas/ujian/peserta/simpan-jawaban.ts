'use server'

import { PILIHAN_JAWABAN } from '@/config/const'
import { makeJwtPostRequestAction } from '@/utils/action'

type DataType = {
  jawaban: {
    id: string
    jw: (typeof PILIHAN_JAWABAN)[number] | ''
  }[]
  durasi: number
}

export const simpanJawabanAction = async (
  idKelas: string,
  id: string,
  data: DataType
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/peserta/kelas/${idKelas}/aktifitas/${id}/sesi-ujian/jawab`,
    data
  )
