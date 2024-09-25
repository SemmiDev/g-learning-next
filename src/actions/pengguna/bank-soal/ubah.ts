'use server'

import { UbahBankSoalFormSchema } from '@/components/page/pengguna/bank-soal/kategori/modal/ubah-bank-soal'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahBankSoalAction = (
  idKategori: string,
  id: string,
  data: UbahBankSoalFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/kategori-bank-soal/${idKategori}/bank-soal/${id}`,
    {
      judul: data.judul,
      jumlah_soal_yang_digunakan: data.gunakan,
      bobot_benar: data.bobotBenar,
      bobot_salah: data.bobotSalah,
      bobot_kosong: data.bobotKosong,
      deskripsi: cleanQuill(data.deskripsi),
    }
  )
