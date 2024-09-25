'use server'

import { TambahBankSoalFormSchema } from '@/components/page/pengguna/bank-soal/kategori/modal/tambah-bank-soal'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const tambahBankSoalAction = (
  idKategori: string,
  data: TambahBankSoalFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kategori-bank-soal/${idKategori}/bank-soal`,
    {
      judul: data.judul,
      jumlah_soal_yang_digunakan: data.gunakan,
      bobot_benar: data.bobotBenar,
      bobot_salah: data.bobotSalah,
      bobot_kosong: data.bobotKosong,
      deskripsi: cleanQuill(data.deskripsi),
    }
  )
