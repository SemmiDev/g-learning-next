'use server'

import { UbahMateriFormSchema } from '@/components/page/pengguna/ruang-kelas/akademik/kelas/linimasa/modal/ubah-materi'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahAktifitasMateriAction = async (
  idKelas: string,
  id: string,
  data: UbahMateriFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas/${id}`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      berkas: (data.berkas ?? []).map((item) => item.id),
      tipe: 'Materi',
      waktu_akhir_absen: undefined,
      jadwal: data.jadwal ?? '',
    }
  )
