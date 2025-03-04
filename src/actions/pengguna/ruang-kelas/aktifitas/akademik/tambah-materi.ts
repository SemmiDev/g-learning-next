'use server'

import { TambahMateriFormSchema } from '@/components/page/pengguna/ruang-kelas/akademik/kelas/linimasa/modal/tambah-materi'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasMateriAction = async (
  idKelas: string,
  data: TambahMateriFormSchema
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
      tipe: 'Materi',
      waktu_akhir_absen: undefined,
      jadwal: data.jadwal,
    }
  )
