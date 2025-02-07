'use server'

import { TambahTugasFormSchema } from '@/components/page/pengguna/ruang-kelas/umum/kelas/diskusi/modal/tambah-tugas'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasTugasAction = async (
  idKelas: string,
  data: TambahTugasFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas`,
    {
      ...(data.share && data.materi
        ? {
            judul: data.materi.name,
            deskripsi: cleanQuill(data.materi.desc),
            berkas: data.materi.fileIds,
          }
        : {
            judul: data.judul,
            deskripsi: cleanQuill(data.catatan),
            berkas: (data.berkas ?? []).map((item) => item.id),
          }),
      tipe: 'Penugasan',
      batas_waktu: data.batasWaktu,
    }
  )
