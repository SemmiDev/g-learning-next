'use server'

import { TambahTugasFormSchema } from '@/components/page/pengguna/ruang-kelas/kelas/diskusi/modal/tambah-tugas'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasTugasAction = (
  idKelas: string,
  data: TambahTugasFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Penugasan',
      batas_waktu: data.batasWaktu,
      berkas: (data.berkas ?? []).map((item) => item.id),
    }
  )
