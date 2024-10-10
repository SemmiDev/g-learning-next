'use server'

import { UbahInformasiFormSchema } from '@/components/page/pengguna/ruang-kelas/kelas/diskusi/modal/ubah-informasi'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasInformasiAction = (
  idKelas: string,
  id: string,
  data: UbahInformasiFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      jadwal: data.jadwal ?? null,
      berkas: (data.berkas ?? []).map((item) => item.id),
    }
  )
