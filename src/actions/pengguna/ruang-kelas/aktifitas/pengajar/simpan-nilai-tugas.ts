'use server'

import { NilaiTugasFormSchema } from '@/components/page/pengguna/ruang-kelas/kelas/tugas/penilaian/body'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const simpanNilaiTugasAction = (
  idKelas: string,
  idAktifitas: string,
  idPeserta: string,
  data: NilaiTugasFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/pengajar/kelas/${idKelas}/aktifitas/${idAktifitas}/penilaian-tugas`,
    {
      id_peserta: idPeserta,
      nilai: data.nilai,
      catatan_pengajar: cleanQuill(data.catatan),
    }
  )
