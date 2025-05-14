import { PILIHAN_JAWABAN } from '@/config/const'
import { makeJwtGetRequestApi } from '@/utils/api'

type DataType = {
  id: string
  pertanyaan: string
  tipe: 'PILIHAN_GANDA' | 'ESSAY'
  gambar_soal: string[]
  jawaban_a: {
    teks: string
    id_foto: string | null
    url_foto: string | null
  }
  jawaban_b: {
    teks: string
    id_foto: string | null
    url_foto: string | null
  }
  jawaban_c: {
    teks: string
    id_foto: string | null
    url_foto: string | null
  }
  jawaban_d: {
    teks: string
    id_foto: string | null
    url_foto: string | null
  }
  jawaban_e: {
    teks: string
    id_foto: string | null
    url_foto: string | null
  }
  jawaban_benar: (typeof PILIHAN_JAWABAN)[number]
  bobot_essay: number | null
}

export const lihatSoalApi = async (
  jwt: string,
  idKategori: string,
  id: string
) =>
  makeJwtGetRequestApi<DataType>(
    `${process.env.NEXT_PUBLIC_API_URL}/bank-soal/${idKategori}/soal/${id}`,
    jwt
  )
