'use server'

import { UbahSoalFormSchema } from '@/components/page/pengguna/bank-soal/kategori/soal/modal/ubah'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahSoalAction = async (
  idBankSoal: string,
  id: string,
  data: UbahSoalFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/bank-soal/${idBankSoal}/soal`,
    {
      id,
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
