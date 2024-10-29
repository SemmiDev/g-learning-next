'use server'

import { UbahPaketSoalFormSchema } from '@/components/shared/paket-soal/modal/ubah-paket-soal'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahPaketSoalAction = async (
  idKategori: string,
  id: string,
  data: UbahPaketSoalFormSchema
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
