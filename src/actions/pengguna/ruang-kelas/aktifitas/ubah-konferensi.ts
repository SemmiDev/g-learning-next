'use server'

import { UbahKonferensiFormSchema } from '@/components/page/pengguna/ruang-kelas/kelas/diskusi/modal/ubah-konferensi'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasKonferensiAction = (
  idKelas: string,
  id: string,
  data: UbahKonferensiFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe_presensi: data.presensi === 'aktif' ? 'Otomatis' : '',
      jadwal: data.jadwal ?? '',
      link: data.link,
    }
  )
