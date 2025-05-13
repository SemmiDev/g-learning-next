import { UbahMateriFormSchema } from '@/components/shared/materi/modal/ubah-materi'
import { makeJwtPutRequestAction } from '@/utils/action'
import { cleanQuill } from '@/utils/string'

export const ubahMateriAction = async (
  idKategori: string,
  id: string,
  data: UbahMateriFormSchema
) =>
  makeJwtPutRequestAction(
    `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${idKategori}/bank-ajar/${id}`,
    {
      judul: data.judul,
      deskripsi: cleanQuill(data.catatan),
      id_berkas: (data.berkas ?? []).map((berkas) => berkas.id),
    }
  )
