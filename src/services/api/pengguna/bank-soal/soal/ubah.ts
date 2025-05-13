import { UbahSoalFormSchema } from '@/components/pages/pengguna/bank-soal/kategori/soal/modal/ubah'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'
import { switchCaseObject } from '@/utils/switch-case'

export const ubahSoalAction = async (
  idBankSoal: string,
  id: string,
  data: UbahSoalFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/bank-soal/${idBankSoal}/soal`,
    {
      id,
      pertanyaan: cleanQuill(data.soal),
      tipe: switchCaseObject(
        data.tipe.value,
        {
          'single-choice': 'PILIHAN_GANDA',
          essay: 'ESSAY',
        },
        undefined
      ),
      jawaban_a:
        data.tipe.value !== 'essay'
          ? {
              teks: cleanQuill(data.jawaban[0]) ?? '',
            }
          : undefined,
      jawaban_b:
        data.tipe.value !== 'essay'
          ? {
              teks: cleanQuill(data.jawaban[1]) ?? '',
            }
          : undefined,
      jawaban_c:
        data.tipe.value !== 'essay'
          ? {
              teks: cleanQuill(data.jawaban[2]) ?? '',
            }
          : undefined,
      jawaban_d:
        data.tipe.value !== 'essay'
          ? {
              teks: cleanQuill(data.jawaban[3]) ?? '',
            }
          : undefined,
      jawaban_e:
        data.tipe.value !== 'essay'
          ? {
              teks: cleanQuill(data.jawaban[4]) ?? '',
            }
          : undefined,
      jawaban_benar:
        data.tipe.value === 'single-choice' ? data.benar : undefined,
      bobot_essay: data.bobot,
    }
  )
