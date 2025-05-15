import { UbahUjianFormSchema } from '@/components/pages/pengguna/ruang-kelas/umum/kelas/diskusi/modal/ubah-ujian'
import { makeJwtPutRequestApi } from '@/utils/api'
import { mustBe } from '@/utils/must-be'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasUjianApi = async (
  jwt: string,
  idKelas: string,
  id: string,
  data: UbahUjianFormSchema
) =>
  makeJwtPutRequestApi(
    `${process.env.NEXT_PUBLIC_API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    jwt,
    {
      judul: data.judul,
      jenis: mustBe(data.jenis?.value, ['Tugas', 'UTS', 'UAS'], 'Tugas'),
      deskripsi: cleanQuill(data.catatan),
      tipe_presensi: data.presensi === 'aktif' ? 'Otomatis' : '',
      waktu_akhir_absen: undefined,
      acak_soal: data.acakSoal === 'aktif' ? 1 : 0,
      acak_jawaban: data.acakJawaban === 'aktif' ? 1 : 0,
      jadwal: data.jadwal ?? '',
      paket: data.paket?.id,
      mulai: data.mulai,
      selesai: data.selesai,
      durasi: data.durasi,
    }
  )
