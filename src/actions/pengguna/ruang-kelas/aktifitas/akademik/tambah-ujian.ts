'use server'

import { TambahUjianFormSchema } from '@/components/page/pengguna/ruang-kelas/akademik/kelas/linimasa/modal/tambah-ujian'
import { makeJwtPostRequestAction } from '@/utils/action'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasUjianAction = async (
  idKelas: string,
  data: TambahUjianFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas`,
    {
      judul: data.judul,
      jenis: mustBe(data.jenis?.value, ['Tugas', 'UTS', 'UAS'], 'Tugas'),
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Ujian',
      waktu_akhir_absen: undefined,
      acak_soal: data.acakSoal === 'aktif' ? 1 : 0,
      acak_jawaban: data.acakJawaban === 'aktif' ? 1 : 0,
      jadwal: data.jadwal,
      paket: data.paket?.id,
      mulai: data.mulai,
      selesai: data.selesai,
      durasi: data.durasi,
    }
  )
