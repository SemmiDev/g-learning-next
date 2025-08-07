import { makeJwtGetRequestApi } from '@/utils/api'

export type DataType = {
  list: {
    id: string
    tipe: 'PILIHAN_GANDA' | 'ESSAY'
    pertanyaan: string
    jawaban_a: string
    jawaban_b: string
    jawaban_c: string
    jawaban_d: string
    jawaban_e: string
    bobot_essay: number
    jawaban_benar: 'A' | 'B' | 'C' | 'D' | 'E' | null
  }[]
}

export const dataPreviewSoalApi = async (jwt: string, id: string) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/bank-soal/${id}/preview-soal`,
    jwt
  )
