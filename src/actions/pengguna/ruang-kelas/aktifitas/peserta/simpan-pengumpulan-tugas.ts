'use server'

import { PengumpulanTugasFormSchema } from '@/components/page/pengguna/ruang-kelas/umum/kelas/diskusi/detail-tugas/kumpulkan-card'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const simpanPengumpulanTugasAction = async (
  idKelas: string,
  idAktifitas: string,
  data: PengumpulanTugasFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/peserta/kelas/${idKelas}/aktifitas/${idAktifitas}/pengumpulan-tugas`,
    {
      catatan: cleanQuill(data.catatan),
      berkas: data.berkas.map((berkas) => berkas.id),
    }
  )
