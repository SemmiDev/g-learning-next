import { BuatKelasFormSchema } from '@/components/pages/pengguna/ruang-kelas/umum/modal/buat-kelas'
import { NAMA_HARI, ZONA_WAKTU } from '@/config/const'
import { makeJwtPostRequestApi } from '@/utils/api'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const tambahKelasApi = async (jwt: string, data: BuatKelasFormSchema) =>
  makeJwtPostRequestApi(`${process.env.NEXT_PUBLIC_API_URL}/kelas`, jwt, {
    nama_kelas: data.program,
    sub_judul: data.kelas,
    deskripsi: cleanQuill(data.catatan),
    tipe: data.tipe,
    id_thumbnail_kelas: data.cover?.id,
    jadwal: data.hariWaktu.map((item) => ({
      hari: mustBe(item.hari?.value, NAMA_HARI, 'Senin'),
      waktu_mulai: item.mulaiWaktu,
      waktu_selesai: item.sampaiWaktu,
      zona_waktu: mustBe(item.zona?.value, ZONA_WAKTU, 'WIB'),
    })),
  })
