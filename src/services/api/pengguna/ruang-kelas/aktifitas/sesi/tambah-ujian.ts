import { TambahUjianSesiFormSchema } from '@/components/pages/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/sesi/pengajar/modal/tambah-ujian'
import { makeJwtPostRequestAction } from '@/utils/action'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasUjianSesiAction = async (
  idKelas: string,
  idSesi: string,
  data: TambahUjianSesiFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
    {
      judul: data.judul,
      jenis: mustBe(data.jenis?.value, ['Tugas', 'UTS', 'UAS'], 'Tugas'),
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Ujian',
      acak_soal: data.acakSoal === 'aktif' ? 1 : 0,
      acak_jawaban: data.acakJawaban === 'aktif' ? 1 : 0,
      paket: data.paket?.id,
      mulai: data.mulai,
      selesai: data.selesai,
      durasi: data.durasi,
      id_pertemuan_kelas: idSesi,
    }
  )
