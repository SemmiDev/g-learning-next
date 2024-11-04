'use server'

import { BuatKelasFormSchema } from '@/components/page/pengguna/ruang-kelas/modal/buat-kelas'
import { NAMA_HARI, ZONA_WAKTU } from '@/config/const'
import { makeJwtPostRequestAction } from '@/utils/action'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const tambahKelasAction = async (data: BuatKelasFormSchema) =>
  makeJwtPostRequestAction(`${process.env.API_URL}/kelas`, {
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
