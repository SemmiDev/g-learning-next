import { makeJwtPostRequestAction } from '@/utils/action'

type DataType = {
  jawaban: {
    id: string
    jw: string
  }[]
  durasi: number
}

export const simpanJawabanAction = async (
  idKelas: string,
  id: string,
  data: DataType
) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/peserta/kelas/${idKelas}/aktifitas/${id}/sesi-ujian/jawab`,
    data
  )
