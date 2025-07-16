import { makeJwtPostRequestApi } from '@/utils/api'

export type DataType = {
  list: {
    id_soal: string
    nilai: string
    evaluasi_ai: string
  }[]
}

export const koreksiOtomatisUjianApi = async (
  jwt: string,
  idKelas: string,
  idAktifitas: string,
  idPeserta: string
) =>
  makeJwtPostRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/pengajar/kelas/${idKelas}/aktifitas/${idAktifitas}/jawaban/${idPeserta}/nilai-otomatis`,
    jwt
  )
