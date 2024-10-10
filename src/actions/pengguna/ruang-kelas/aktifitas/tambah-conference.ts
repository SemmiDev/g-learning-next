'use server'

import { TambahConferenceFormSchema } from '@/components/page/pengguna/ruang-kelas/kelas/diskusi/modal/tambah-conference'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasConferenceAction = (
  idKelas: string,
  data: TambahConferenceFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Konferensi',
      tipe_presensi: data.presensi === 'aktif' ? 'Otomatis' : undefined,
      jadwal: data.jadwal,
    }
  )
