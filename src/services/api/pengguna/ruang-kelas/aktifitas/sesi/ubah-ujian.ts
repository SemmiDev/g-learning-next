import { UbahUjianSesiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/sesi/pengajar/modal/ubah-ujian'
import { makeJwtPutRequestAction } from '@/utils/action'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasUjianSesiAction = async (
  idKelas: string,
  id: string,
  data: UbahUjianSesiFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    {
      judul: data.judul,
      jenis: mustBe(data.jenis?.value, ['Tugas', 'UTS', 'UAS'], 'Tugas'),
      deskripsi: cleanQuill(data.catatan),
      acak_soal: data.acakSoal === 'aktif' ? 1 : 0,
      acak_jawaban: data.acakJawaban === 'aktif' ? 1 : 0,
      paket: data.paket?.id,
      mulai: data.mulai,
      selesai: data.selesai,
      durasi: data.durasi,
    }
  )
