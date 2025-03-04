'use server'

import { TambahDiskusiFormSchema } from '@/components/page/pengguna/ruang-kelas/umum/kelas/diskusi/modal/tambah-diskusi'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const tambahAktifitasDiskusiAction = async (
  idKelas: string,
  data: TambahDiskusiFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kelas/${idKelas}/aktifitas`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: 'Diskusi',
    }
  )
