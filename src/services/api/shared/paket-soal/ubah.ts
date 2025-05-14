import { UbahPaketSoalFormSchema } from '@/components/shared/paket-soal/modal/ubah-paket-soal'
import { makeJwtPutRequestApi } from '@/utils/api'
import { cleanQuill } from '@/utils/string'

export const ubahPaketSoalApi = async (
  jwt: string,
  idKategori: string,
  id: string,
  data: UbahPaketSoalFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-soal/${idKategori}/bank-soal/${id}`,
    jwt,
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
