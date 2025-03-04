'use server'

import { UbahKonferensiFormSchema } from '@/components/page/pengguna/ruang-kelas/akademik/kelas/linimasa/modal/ubah-konferensi'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasKonferensiAction = async (
  idKelas: string,
  id: string,
  data: UbahKonferensiFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      jadwal: data.jadwal ?? '',
      link: data.link,
    }
  )
