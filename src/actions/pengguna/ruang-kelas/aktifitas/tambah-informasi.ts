'use server'

import { TambahInformasiFormSchema } from '@/components/page/pengguna/ruang-kelas/umum/kelas/diskusi/modal/tambah-informasi'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasInformasiAction = async (
  idKelas: string,
  data: TambahInformasiFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Pengumuman',
      jadwal: data.jadwal,
      berkas: (data.berkas ?? []).map((item) => item.id),
    }
  )
