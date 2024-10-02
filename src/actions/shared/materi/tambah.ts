'use server'

import { TambahMateriFormSchema } from '@/components/shared/materi/modal/tambah-materi'
import { makeJwtPostRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const tambahMateriAction = (
  idKategori: string,
  data: TambahMateriFormSchema
) =>
  makeJwtPostRequestAction(
    `${process.env.API_URL}/kategori-bank-ajar/${idKategori}/bank-ajar`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      tipe: data.tipe,
      id_berkas: (data.berkas ?? []).map((berkas) => berkas.id),
    }
  )
