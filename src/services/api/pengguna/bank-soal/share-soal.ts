import { ShareSoalUjianFormSchema } from '@/components/pages/pengguna/bank-soal/kategori/modal/share-soal-ujian'
import { SoalType } from '@/components/pages/pengguna/bank-soal/kategori/soal-card'
import { makeJwtPostRequestApi } from '@/utils/api'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const shareSoalUjianApi = async (
  jwt: string,
  idKelas: string,
  soal: SoalType,
  data: ShareSoalUjianFormSchema
) =>
  makeJwtPostRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas`,
    jwt,
    {
      judul: data.judul,
      jenis: mustBe(
        data.jenis?.value,
        ['Tugas', 'UTS', 'UAS'] as const,
        'Tugas'
      ),
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
