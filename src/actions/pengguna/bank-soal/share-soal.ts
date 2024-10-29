'use server'

import { ShareSoalUjianFormSchema } from '@/components/page/pengguna/bank-soal/kategori/modal/share-soal-ujian'
import { SoalType } from '@/components/page/pengguna/bank-soal/kategori/soal-card'
import { makeJwtPostRequestAction } from '@/utils/action'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const shareSoalUjianAction = async (
  idKelas: string,
  soal: SoalType,
  data: ShareSoalUjianFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas`,
    {
      judul: data.judul,
      jenis: mustBe(data.jenis?.value, ['Tugas', 'UTS', 'UAS'], 'Tugas'),
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Ujian',
      tipe_presensi: data.presensi === 'aktif' ? 'Otomatis' : undefined,
      waktu_akhir_absen: undefined,
      acak_soal: data.acakSoal === 'aktif' ? 1 : 0,
      acak_jawaban: data.acakJawaban === 'aktif' ? 1 : 0,
      jadwal: data.jadwal,
      paket: soal.id,
      mulai: data.mulai,
      selesai: data.selesai,
      durasi: data.durasi,
    }
  )
