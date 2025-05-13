import { UbahBankSoalFormSchema } from '@/components/pages/pengguna/bank-soal/kategori/modal/ubah-bank-soal'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahBankSoalAction = async (
  idKategori: string,
  id: string,
  data: UbahBankSoalFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal/${idKategori}/bank-soal/${id}`,
    {
      judul: data.judul,
      jumlah_soal_yang_digunakan: data.gunakan,
      bobot_benar: data.bobotPilihanBenar,
      bobot_salah: data.bobotPilihanSalah,
      bobot_kosong: data.bobotPilihanKosong,
      persentase_pilihan_ganda: data.bobotPilihan,
      persentase_essay: data.bobotEsai,
      deskripsi: cleanQuill(data.deskripsi),
    }
  )
