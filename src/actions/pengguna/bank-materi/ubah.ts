'use server'

import { UbahMateriFormSchema } from '@/components/page/pengguna/bank-materi/kategori/modal/ubah-materi'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahBankMateriAction = (
  idKategori: string,
  id: string,
  data: UbahMateriFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.API_URL}/kategori-bank-ajar/${idKategori}/bank-ajar/${id}`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      id_berkas: (data.berkas ?? []).map((berkas) => berkas.id),
    }
  )
