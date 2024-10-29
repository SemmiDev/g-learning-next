'use server'

import { TambahSoalFormSchema } from '@/components/page/pengguna/bank-soal/kategori/soal/container'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const tambahSoalAction = async (
  idBankSoal: string,
  data: TambahSoalFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/bank-soal/${idBankSoal}/soal`,
    {
      pertanyaan: cleanQuill(data.soal),
      jawaban_a: {
        teks: cleanQuill(data.jawaban[0]) ?? '',
      },
      jawaban_b: {
        teks: cleanQuill(data.jawaban[1]) ?? '',
      },
      jawaban_c: {
        teks: cleanQuill(data.jawaban[2]) ?? '',
      },
      jawaban_d: {
        teks: cleanQuill(data.jawaban[3]) ?? '',
      },
      jawaban_e: {
        teks: cleanQuill(data.jawaban[4]) ?? '',
      },
      jawaban_benar: data.benar,
    }
  )
