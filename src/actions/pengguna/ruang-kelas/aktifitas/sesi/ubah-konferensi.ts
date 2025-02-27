'use server'

import { UbahKonferensiSesiFormSchema } from '@/components/page/pengguna/ruang-kelas/akademik/kelas/sesi-pembelajaran/sesi/pengajar/modal/ubah-konferensi'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasKonferensiSesiAction = async (
  idKelas: string,
  id: string,
  data: UbahKonferensiSesiFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      link: data.link,
    }
  )
