import { TambahUjianFormSchema } from '@/components/pages/pengguna/ruang-kelas/umum/kelas/diskusi/modal/tambah-ujian'
import { makeJwtPostRequestAction } from '@/utils/action'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasUjianAction = async (
  idKelas: string,
  data: TambahUjianFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
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
      paket: data.paket?.id,
      mulai: data.mulai,
      selesai: data.selesai,
      durasi: data.durasi,
    }
  )
