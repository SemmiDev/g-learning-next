'use server'

import { UbahConferenceFormSchema } from '@/components/page/pengguna/ruang-kelas/kelas/diskusi/modal/ubah-conference'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasConferenceAction = (
  idKelas: string,
  id: string,
  data: UbahConferenceFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe_presensi: data.presensi === 'aktif' ? 'Otomatis' : null,
      jadwal: data.jadwal ?? null,
    }
  )
