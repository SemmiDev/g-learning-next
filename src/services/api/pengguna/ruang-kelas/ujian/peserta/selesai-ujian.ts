import { makeJwtPostRequestApi } from '@/utils/api'

type DataType = {
  jawaban: {
    id: string
    jw: string
  }[]
  durasi: number
}

export const selesaiUjianApi = async (
  jwt: string,
  idKelas: string,
  id: string,
  data: DataType
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/peserta/kelas/${idKelas}/aktifitas/${id}/sesi-ujian/selesaikan`,
    jwt,
    data
  )
