'use server'

import { PenilaianUjianFormSchema } from '@/components/page/pengguna/ruang-kelas/umum/kelas/ujian/pengajar/penilaian/body'
import { makeJwtPostRequestAction } from '@/utils/action'

export const simpanNilaiUjianAction = async (
  idKelas: string,
  idAktifitas: string,
  idPeserta: string,
  data: PenilaianUjianFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/pengajar/kelas/${idKelas}/aktifitas/${idAktifitas}/jawaban/${idPeserta}`,
    {
      soal: data.nilai.map((item) => ({
        id: item.id,
        nilai: item.value,
      })),
    }
  )
