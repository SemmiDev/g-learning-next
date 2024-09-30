'use server'

import { PengaturanKelasFormSchema } from '@/components/page/pengguna/ruang-kelas/modal/pengaturan-kelas'
import { ZONA_WAKTU } from '@/config/const'
import { makeJwtPutRequestAction } from '@/utils/action'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const ubahKelasAction = (id: string, data: PengaturanKelasFormSchema) =>
  makeJwtPutRequestAction(`${process.env.API_URL}/kelas/${id}`, {
    nama_kelas: data.program,
    sub_judul: data.kelas,
    deskripsi: cleanQuill(data.catatan),
    tipe: data.tipe,
    id_thumbnail_kelas: data.cover?.id,
    jadwal: data.hariWaktu.map((item) => ({
      hari: item.hari,
      waktu_mulai: item.mulaiWaktu,
      waktu_selesai: item.sampaiWaktu,
      zona_waktu: mustBe(item.zona?.value, ZONA_WAKTU, 'WIB'),
    })),
  })
